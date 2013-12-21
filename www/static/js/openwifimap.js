var Openwifimap = function(apiUrl, bbox) {
  this.apiUrl = apiUrl;
  this.url = apiUrl + '/view_nodes_spatial?bbox=' + bbox;
}

Openwifimap.prototype = {
  'getGraph' : function() {
    var g = new SimpleGraph(),
        dfd = $.Deferred();

    d3.json(this.url, function(error, json) {
      if (error) {
        dfd.reject();
        return;
      }

      var data = json.rows;
      for (var i = 0; i < data.length; i++) {
        var node = data[i].value;
        try {
          for (var j = 0; j < node.links.length; j++) {
            var target = node.links[j];
            g.addEdge(node, target, { 'quality': target.quality });
          }
        } catch (e) { }
        dfd.notify(i, data.length);
      }

      this.graph = g;
      dfd.resolve(g);
    });

    return dfd;
  },

  'getNodes' : function() {
    var retDfd = $.Deferred(),
        nodeUrl = this.apiUrl + '/db/';

    d3.json(this.url, function(json) {
      var deferreds = [];
      var nodes = [];

      for (var i = 0; i < json.rows.length; i++) {
        deferreds.push(function(dfd, j) {
          d3.json(nodeUrl + json.rows[j].id, function(node) {
            nodes.push(node);
            retDfd.notify(j, json.rows.length);
            dfd.resolve();
          });
          return dfd;
        }($.Deferred(), i));

      }

      $.when.apply($, deferreds).done(function() {
        retDfd.resolve(nodes);
      }).fail(function() {
        retDfd.reject();
      });
    });

    return retDfd;
  }
};
