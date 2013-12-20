var Openwifimap = function(url) {
  this.baseUrl = url;
}

Openwifimap.prototype = {
  'getGraph' : function(cb) {
    var g = new SimpleGraph();
    var url = this.baseUrl + '/view_nodes_spatial?bbox=13.179473876953125,52.45308034523523,13.647079467773438,52.59241215943279'
    d3.json(url, function(json) {
      var data = json.rows;
      for (var i = 0; i < data.length; i++) {
        var node = data[i].value;
        try {
          for (var j = 0; j < node.links.length; j++) {
            var target = node.links[j],
                edge = {
                  'source' : {
                    'id' : node.id,
                    'classId' : 'l-' + node.id.replace(/\./g,'')
                  },
                  'target' : {
                    'id': target.id,
                    'classId' : 'l-' + target.id.replace(/\./g,'')
                  },
                };

            g.addEdge(node, target, { 'quality': target.quality });
          }
        } catch (e) { }
      }

      cb(g);
    });
  },

  'getNodes' : function(cb) {
    var url = 'http://api.openwifimap.net/view_nodes_spatial?bbox=13.179473876953125,52.45308034523523,13.647079467773438,52.59241215943279';
    d3.json(url, function(json) {
      var deferreds = [];
      var nodes = [];

      for (var i = 0; i < json.rows.length; i++) {
        deferreds.push(function(dfd) {
          var nodeUrl = 'http://api.openwifimap.net/db/'+json.rows[i].id;
          d3.json(nodeUrl, function(node) {
            nodes.push(node);
            dfd.resolve();
          });
          return dfd;
        }($.Deferred()));

      }

      $.when.apply($, deferreds).then(function() {
        cb(nodes);
      });
    });
  }
};
