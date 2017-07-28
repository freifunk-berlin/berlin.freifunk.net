#!/bin/bash
#
# script to pull git and generate www root dir
#
# 2013-05-08 dpaufler: initial version
# 2017-07-28 sarumpaet: updated to use make+rsync

BASE='/home/berlin.freifunk.net'
WWW_TARGET_DIR="${2:-${BASE}/www}"
GIT_TARGET_DIR="${1:-${BASE}/git}"

#update git
cd ${GIT_TARGET_DIR}
/usr/bin/git pull -q origin master

#generate website
#use rsync so that unchanged pages keep their last-modified date
make generate && rsync -a --checksum www/_build/ ${WWW_TARGET_DIR}

exit 0

#EOF

