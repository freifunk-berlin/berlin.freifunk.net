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

* WDS transpoarent bridge `on`: All traffic is passed without being modified in any way. Like running an ethernet cable. Without this the MAC address of the packet sent through the AP changes to the MAC of the AP, affecting e.g. latency.

### Antennas with airOS 8

* Wireless Network Protection: This feature protects the airMAX network against de-authentication attacks. airMAX AC and airMAX M client devices are supported but they must be used with an airMAX AC AP.
* Automatic powe control `on` (Reducing the transmission power reduces interference with neighboring devices.)
* Keep signal level `reliable`


#### Wireless Settings

Basic Wireless Settings

* Auto adjust Distance should be `on`.
* Channel Width: 40 MHz (We use wider chanells for more bandwidth)
* Activate control frequency list (The default options are for 20 MHz width. We need to use other frequencies as center frequencies (-20) so that we do not overlap channels. Control frequency: should be one of the sub channels (20 MHz channels).)
TODO: List with channels for 40 MHz
TODO: Channel image
TODO: Clarify how many options should be selected for control frequency list and if ther should allways be a non-dfs option.

* Client isolation must be `on`: Blocks traffic between clients. Without this we would get mesh links between the different stations connected to the same AP.
* Multicast enhancement must be `off`: If clients do not send IGMP (Internet Group Management Protocol) messages, then they are not registered as receivers of your multicast traffic. Using IGMP snooping, the Multicast Enhancement option isolates multicast traffic from unregistered clients and allows the device to send multicast traffic to registered clients using higher data rates. This lessens the risk of traffic overload on PtMP links and increases the reliability of multicast traffic since packets are transmitted again if the first transmission fails. If clients do not send IGMP messages but should receive multicast traffic, then you may need to disable the Multicast Enhancement option.

Wireless Security

* Wireless Network Protection should be `on`. This protects airMAX networks against de-authentication attacks and therefore having unstable links. Automated de-authentication attacks are quite popular these days due to availability of devices like the Pwnagotchi and the Flipper Zero. Wireless Network Protection works with all clients with firmware version 8.5.1/6.1.6 and above. Clients with lower firmware versions will not be able to connect any more but we don't have any devices with firmware versions that old in the network.

Advanced

* AMSDU should be `on`. This allows for higher throughput on good links.
* Client Isolation must be `on`. Without this we will have mesh links between clients.
* Automatic Power Control should be `on` and set to `reliable`. This will help to reduce noise on neighboring antennas.
* ReSE should be `on`. ReSE stand for Receive Signal Enhancement and improves the receiver performance for the whole network.

**Frame Duratiuon:**
- Flexible (legacy): lower latency
- Flexible: higher throughput

#### Network Settings

Management Network Settings

* IPv6 must be `on`.
* IPv6 address should be `local` or `SLAAC`

Advanced

* Two VLANs are needed on the interface that is connected to the core router. One with ID `42` and comment `mgmt` and the other one with the correct mesh VLAN as configured on the core and the mesh connection as comment.
* The existing bridge must be changed to connect the mesh-VLAN and the Wifi-interface.
* The management interface must be the management VLAN.
* The IP address must be `static` and set to the management IP assigned to this device in the locations config.
* Gateway and DNS should point to the core routers IP address.

#### Services

SNMP

* SNMP Agent must be `enabled`. We require this to monitor the antennas.
* SNMP Community must be `public`.
* SNMP Location must be filled e.g with the location name (e.g. `sama`).
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

**How GPS Sync Works:**

GPS Sync™ eliminates problems that occur with multiple access points (APs) that are co‑located. When GPS Sync is enabled, all synchronized APs will transmit at the same time and receive at the same time. The result is a drastic reduction in co-location interference. Each AP has a GPS receiver and synchronizes its transmissions to the GPS timing signal – no connection between APs is required. To use GPS Sync, all APs must have GPS receivers and all radios must be
running airOS® version 8.3 or above. Frequency reuse will be possible in properly designed networks.

System Accounts

* Administrator username should be `ubnt`. We use `ubnt` on most devices on the network, however on some devices we also use `root` and `admin`.

Location

* Set Latitude, Longitude and Height so that fresnel can be calculated in the dashboard view.

### Switches
