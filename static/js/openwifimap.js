var Openwifimap = function(url) {
  this.url = url;
}

Openwifimap.prototype = {
  'getGraph' : function(cb) {
    var g = new Graph();

    d3.jsonp(this.url, function(data) {
      for (var i = 0; i < data.rows.length; i++) {
        var node = data.rows[i].value;
        try {
          for (var j = 0; j < node.neighbors.length; j++) {
            var target = node.neighbors[j],
                edge = {
                  'source' : {
                    'id' : node.id,
                    'classId' : 'l-' + node.id.replace(/\./g,'')
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
    d3.jsonp(this.url, function(data) {
      var nodes = []
      for (var i = 0; i < data.rows.length; i++)
        nodes.push(data.rows[i].doc);

      cb(nodes);
    });
  }
};
