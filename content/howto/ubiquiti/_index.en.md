---
title: "Ubiquiti"
description: ""
featured_image: ''
---

## How to configure antennas and switches for the Berlin Freifunk Backbone?

This guide describes how we usually configure antennas and switches for the Berlin Backbone (BBB) of Freifunk Berlin. The guide describes the settings and also why we configure it that way.

### General Settings

#### SSID naming convention

The SSID for PtMP APs should be setup as `freifunk-[location]-[orientation]-[frequency]` and the SSID for PtP APs should be setup as `freifunk-[location]-[target-location]-[frequency]`, each separated by a hyphen. The frequency is optional, especially on devices with backup radios.

This format allow a clear identification:

* The `freifunk` prefix shows to people outside our community that they might be able to connect. This adds to our visibility and therefore helps the Freifunk community to build a brand and grow.
* The location is mandatory as it helps to identify the site.
* The orientation is also mandatory and must be in German and can be either the long variant (`nord`, `ost`, `sued`, `west`) the short variant (`n`, `o`, `s`, `w`) or a 2 or 3 letter combination to show more precise orientations for locations with many APs (e.g. `no`, `wsw`).

### Antennas with airOS 6

### Antennas with airOS 8

#### Wireless Settings

Basic Wireless Settings

* Auto adjust Distance should be `on`.

Wireless Security

* Wireless Network Protection should be `on`. This protects airMAX networks against de-authentication attacks and therefore having unstable links. Automated de-authentication attacks are quite popular these days due to availability of devices like the Pwnagotchi and the Flipper Zero. Wireless Network Protection works with all clients with firmware version 8.5.1/6.1.6 and above. Clients with lower firmware versions will not be able to connect any more but we don't have any devices with firmware versions that old in the network.

Advanced

* AMSDU should be `on`. This allows for higher throughput on good links.
* Client Isolation must be `on`. Without this we will have mesh links between clients.
* Automatic Power Control should be `on` and set to `reliable`. This will help to reduce noise on neighboring antennas.
* ReSE should be `on`. ReSE stand for Receive Signal Enhancement and improves the receiver performance for the whole network.

#### Network Settings

Management Network Settings

* IPv6 must be `on`.
* IPv6 address should be `local` or `SLAAC`

#### Services

SNMP

* SNMP Agent must be `enabled`. We require this to monitor the antennas.
* SNMP Community must be `public`.
* SNMP Community must be filled e.g with the location name (e.g. `sama`).
* SNMP Contact must be filled e.g with `none`.

Web Server

* Secure Connection (HTTPS) must be `on`. We only want to use encrypted connections when accessing the web interface.

SSH Sever

* SSH Server must be `enabled`. We want to be able to manage antennas via SSH.

Device Discovery

* Discovery should be `on`. We manage Ubiquiti antennas with UISP and want to be able to discover new devices automatically.
* CDP should be `off`. CDP stands for Cisco Discovery Protocol and we don't use it and therefore it can be disabled.

### System Settings

Device

* Device name
* Interface Language

Management Radio Settings

* Management Radio on Startup should be `off`.

Date/Time Settings

* Time Zone should be `UTC`.
* NTP Client must be `on` on devices without GPT and must be set to `off` on devices with GPS. The management via UISP requires a synced time. Acquiring the time via GPS is usually more precise.
* NTP Server should be set to the core router ip.

System Accounts

* Administrator username should be `ubnt`. We use `ubnt` on most devices on the network, however on some devices we also use `root` and `admin`.

### Switches
