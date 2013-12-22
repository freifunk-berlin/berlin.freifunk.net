/**
 * Simple graph library for doing DFS and BFS traversing
 *
 * Author: cholin
 * Licence: free beer
 *
 */


/*
 * Node
 */
var Node = function(data) {
  this.childs = [];

  if (typeof(data) == 'object' && 'id' in data) {
    this.id = data.id;
    this.data = data;
  } else {
    this.id = data;
  }
  this.flags = {}
}

Node.prototype = {
  'addChild' : function(node) {
    this.childs.push(node);
  }
}


/**
 * Graph
 *
 * all childs of root node are distinct graphs. root itself is not a valid node.
 *
 */

var SimpleGraph = function() {
  this.root = new Node();
  this.nodes = [];
  this.edges = [];
}

SimpleGraph.prototype = {
  /**
   * Travsere a tree by depth first algo - if func returns undefined the next
   * node will be looked at
   */
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
  },


  /**
   * resets all visited data entries in all graphs
   */
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


  'search' : function(id, root) {
    if (root == undefined)
      root = this.root;

    if (typeof(id) == 'object' && 'id' in id)
      id = id.id;

    return this.depthFirstTraverse(root, function(node) {
      if (id == node.id) {
        return node;
      }
    });
  },


  'addEdge' : function(source, target, data) {
    var from = this.search(source, this.root);
    if (from == undefined)
      from = this.addSingleNode(source, false);

    from.data = source;

    var to = this.search(target, this.root);
    if (to == undefined)
      to = this.addSingleNode(target);

    if (from.childs.indexOf(to) < 0)
      from.addChild(to);

    if (to.childs.indexOf(from) < 0)
      to.addChild(from);

    var edge = {
      'id' : from.id + "-" + to.id,
      'source' : this.nodes.indexOf(from),
      'target' : this.nodes.indexOf(to),
    }

    for (var key in data)
      edge[key] = data[key];

    this.edges.push(edge);
  },

  'addSingleNode' : function(data, orphan) {
      var node = new Node(data);
      this.nodes.push(node);

      if (orphan === false)
        this.root.addChild(node);

      return node;
  },


  'getDistinctGraphs' : function() {
    return this.root.childs;
  },


  'getNodes' : function() {
    return this.nodes;
  },


  'getEdges' : function() {
    return this.edges;
  }

};
