var Openwifimap = function(apiUrl, bbox) {
  this.apiUrl = apiUrl;
  this.url = apiUrl + '/view_nodes_spatial';
  if (bbox != null)
    this.url += '?bbox=' + bbox;
}

Openwifimap.prototype = {
  'getGraph' : function() {
    var g = new SimpleGraph(),
        dfd = $.Deferred(),
        that = this;

    d3.json(this.url, function(error, json) {
      if (error) {
        dfd.reject();
        return;
      }

      var data = json.rows,
          resolved = 0,
          skipped = 0;
      for (var i = 0; i < data.length; i++) {
        var node = data[i].value;
        if (that._validate(node)) {
          if ('links' in node) {
            // to remove some noise, include only links with more than two links
            if (node.links.length > 2) {
              for (var j=0; j < node.links.length; j++) {
                var link = node.links[j];
                g.addEdge(node, link.id, link)
              }
            }
          } else {
            //g.addSingleNode(node, false);
          }
          dfd.notify(++resolved, skipped, data.length);
        } else {
          dfd.notify(resolved, ++skipped, data.length);
        }
      }

      this.graph = g;
      dfd.resolve(g);
    });

    return dfd;
  },

  'getNodes' : function() {
    var retDfd = $.Deferred(),
        nodeUrl = this.apiUrl + '/db/',
        that = this;

    d3.json(this.url, function(json) {
      var deferreds = [],
          nodes = [],
          resolved = 0,
          skipped = 0;

      for (var i = 0; i < json.rows.length; i++) {
        var node = json.rows[i];
          if (that._validate(node.value)) {
            deferreds.push(function(dfd) {
              d3.json(nodeUrl + node.id, function(node) {
                nodes.push(node);
                retDfd.notify(++resolved, skipped, json.rows.length);
                dfd.resolve();
              });
              return dfd;
            }($.Deferred()));
          } else {
            retDfd.notify(resolved, ++skipped, json.rows.length);
          }
      }

      $.when.apply($, deferreds).done(function() {
        retDfd.resolve(nodes);
      }).fail(function() {
        retDfd.reject();
      });
    });

    return retDfd;
  },

  '_validate' : function(node) {
    // ignore this node if mtime older than 7 days
    var date = new Date();
    date.setHours(date.getHours() - 24*7);
    var nodeDate = new Date(node.mtime);
    return nodeDate > date;
  }

};
