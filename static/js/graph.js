var Node = function(data) {
  if (data == undefined) {
    this.root = true
  } else {
    this.data = data;
  }
  this.childs = [];
}

Node.prototype = {
  'getId' : function() {
    if (this.root)
      return null;

    return this.data.id;
  },

  'addChild' : function(node) {
    this.childs.push(node);
  }
}

var Graph = function() {
  this.root = new Node();
  this.nodes = [];
  this.edges = [];
}

Graph.prototype = {
  'search' : function(searched, root) {
    if (root == undefined)
      root = this.root;

    return this.depthFirstTraverse(root, function(node) {
      var id = node.getId();
      if (searched.getId === 'function') {
        if (searched.getId() == id)
          return node;
      } else if (searched.id == id) {
        return node;
      }
    });
  },

  'reset' : function(root) {
    var func = function(node, stack) {
      if (stack.indexOf(node) >= 0)
        return;
      else
        stack.push(node)

      node._visited = false;
      for(var i = 0; i < node.childs.length; i++)
        func(node.childs[i], stack);
    };

    if (root == undefined)
      root = this.root;

    func(root, []);
  },

  'addEdge' : function(source, target, data) {
    var from = this.search(source, this.root);
    if (from == undefined) {
      from = new Node(source);
      this.root.addChild(from);
      this.nodes.push(from);
    }

    var to = this.search(target, this.root);
    if (to == undefined) {
      to = new Node(target);
      this.nodes.push(to);
    }

    if (from.childs.indexOf(to) < 0)
      from.addChild(to);

    if (to.childs.indexOf(from) < 0)
      to.addChild(from);

    var edge = {
      'source' : from,
      'target' : to,
    }

    for (var key in data)
      edge[key] = data[key];

    this.edges.push(edge);
  },

  'getDistinctGraphs' : function() {
    return this.root.childs;
  },

  'getNodes' : function() {
    return this.nodes;
  },

  'getEdges' : function() {
    return this.edges;
  },

  'depthFirstTraverse' : function(root, func) {
      var traverse = function(current, fnct) {
        if (current._visited)
          return;

        current._visited = true;

        var ret = fnct(current);
        if (ret == undefined) {
          var child;

          for(var i = 0; i < current.childs.length; i++) {
             ret = traverse(current.childs[i], fnct);
             if(ret != undefined)
               break;
          }
        }

        return ret;
      }

      var ret = traverse(root, func);
      this.reset(root);
      return ret;
  }
};
