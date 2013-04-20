#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import Flask, render_template, redirect, url_for

SERVER = 'openwifimap.net'
app = Flask(__name__)

@app.route('/network')
def network():
    return redirect(url_for('network_map'))

@app.route('/network/map')
def network_map():
    return render_template("network/map.html", server=SERVER)

@app.route('/network/topology')
def network_topology():
    return render_template("network/topology.html")

@app.route('/network/nodes')
def network_nodes():
    return render_template("network/nodes.html")

@app.route('/network/stats')
def network_stats():
    return render_template("network/stats.html")

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/')
def index():
    return render_template("about.html")

if __name__ == '__main__':
    app.run(debug = True)
