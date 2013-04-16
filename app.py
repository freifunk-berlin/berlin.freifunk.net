#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import Flask, render_template, g, jsonify
from werkzeug.contrib.cache import SimpleCache

import couchdb

SERVER = 'map.pberg.freifunk.net'#openwifimap.net'
DATABASE = 'openwifimap'
CACHE_TIMEOUT = 60*60

app = Flask(__name__)
cache = SimpleCache()

@app.before_request
def couch_init():
    couch = couchdb.Server('http://%s' % SERVER)
    g.db = couch[DATABASE]

@app.route('/api/nodes')
def api_nodes():
    nodes = cache.get('nodes')
    edges = cache.get('edges')

    if nodes is None:
        nodes = []

        if edges is None:
            edges = []

        rows = g.db.view('_all_docs', include_docs=True)
        for doc in (row.doc for row in rows):
            node = {'id' : doc.id }

            if 'firmware' in doc:
              rev = doc['firmware']['revision']
              split_id = "(MeshKit/r"
              if split_id in rev:
                rev = rev.split(split_id)[0]
              node['firmware'] = rev

            if 'hardware' in doc:
              if 'model' in doc['hardware']:
                node['hardware'] =  doc['hardware']['model']
              else:
                node['hardware'] =  doc['hardware']

            if 'system' in doc:
              if 'sysinfo' in doc['system'] and len(doc['system']) > 1:
                node['device'] = doc['system']['sysinfo'][1]
            nodes.append(node)

            try:
                for n in doc['neighbors']:
                    edge = {
                        'source'  : doc.id,
                        'target'  : n['id'],
                        'quality' : n['quality']
                    }
                    edges.append(edge)
            except:
                pass

        cache.set('nodes', nodes, CACHE_TIMEOUT)
        cache.set('edges', edges, CACHE_TIMEOUT)

    return jsonify(nodes = nodes, edges = edges)

@app.route('/')
def graph():
    return render_template("graph.html")

@app.route('/edges')
def edges():
    return render_template("edges.html")

@app.route('/stats')
def stats():
    return render_template("stats.html")

@app.route('/map')
def map():
    return render_template("map.html", server=SERVER)

if __name__ == '__main__':
    app.run(debug = True)
