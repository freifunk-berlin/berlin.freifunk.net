var Openwifimap = function(url) {
  this.url = url;
}

Openwifimap.prototype = {
  'getGraph' : function(cb) {
    var g = new SimpleGraph();
    var url = this.baseUrl + 'view_nodes_spatial?bbox=13.179473876953125,52.45308034523523,13.647079467773438,52.59241215943279'
    d3.json(url, function(json) {
      var data = json.rows;
      for (var i = 0; i < data.length; i++) {
        var node = data[i].doc;
        try {
          for (var j = 0; j < node.neighbors.length; j++) {
            var target = node.neighbors[j],
                edge = {
                  'source' : {
                    'id' : node._id,
                    'classId' : 'l-' + node._id.replace(/\./g,'')
                  },
                  'target' : {
                    'id': target.id,
                    'classId' : 'l-' + target.id.replace(/\./g,'')
                  },
                  'edge' : { 'quality': target.quality }
                };

            g.addEdge(edge);
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

      console.log('length', deferreds.length);

      $.when.apply($, deferreds).then(function() {
        cb(nodes);
      });
    });
  }
};
