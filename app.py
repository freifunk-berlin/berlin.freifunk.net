#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import Flask, render_template, g, jsonify
from werkzeug.contrib.cache import SimpleCache

import couchdb

SERVER = 'openwifimap.net'
DATABASE = 'openwifimap'
CACHE_TIMEOUT = 60*60

app = Flask(__name__)
cache = SimpleCache()

@app.before_request
def couch_init():
    couch = couchdb.Server('http://%s' % SERVER)
    g.db = couch[DATABASE]

@app.route('/api/nodes-cached')
def api_nodes_cached():
    nodes = cache.get('nodes')
    if nodes is None:
      amount_of_nodes = 0
    else:
      amount_of_nodes = len(nodes)

    return jsonify(amountOfNodes = amount_of_nodes)

@app.route('/api/nodes')
def api_nodes():
    nodes = cache.get('nodes')
    edges = cache.get('edges')

    if nodes is None:
        nodes = []

        if edges is None:
            edges = []

        for name in [x for x in g.db]:
            entry = g.db.get(name)
            nodes.append(entry.id)
            try:
                for n in entry['neighbors']:
                    edge = {
                        'source' : entry.id,
                        'target' : n['id']
                    }
                    edges.append(edge)
            except:
                pass

        cache.set('nodes', nodes, CACHE_TIMEOUT)
        cache.set('edges', edges, CACHE_TIMEOUT)

    return jsonify(nodes = nodes, edges = edges)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug = True)
