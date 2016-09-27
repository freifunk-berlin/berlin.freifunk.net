#!/bin/bash
#
# script to pull git and generate www root dir
#
# 2013-05-08 dpaufler: initial version

BASE='/home/berlin.freifunk.net'
WWW_TARGET_DIR="${2:-${BASE}/www}"
GIT_TARGET_DIR="${1:-${BASE}/git}"

#update git
cd ${GIT_TARGET_DIR}
/usr/bin/git pull -q origin master

#generate website
cd ${GIT_TARGET_DIR}/www

# activate virtual environment if one exists
if [ -e "${GIT_TARGET_DIR}/env/bin/activate" ]; then
  . "${GIT_TARGET_DIR}/env/bin/activate"
fi

CYRAX=$(which cyrax)
$CYRAX -q -d ${WWW_TARGET_DIR}

exit 0

#EOF
