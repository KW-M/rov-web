#!/bin/bash

# ---- Simlink Directories -----
cd /usr/share/nginx/html/ && ln -sbfFv /rov-web/frontend/build frontend
cd /usr/share/nginx/html/ && ln -sbfFv /rov-web/rov-internal-website/build internal
cd /etc/nginx/ && ln -sbfFv /rov-web/rov-tooling/config-files/nginx.conf nginx.conf

# ---- Setup ownership and permissions -----
# chown -R pi:pi /rov-web
setfacl -m u:pi:rx /;
setfacl -R -m u:pi:rwx /rov-web;
# setfacl -m u:pi:rx /root;
# setfacl -m u:pi:rx /root/.cache;
# setfacl -R -m u:pi:rwx /root/.cache/ms-playwright;


setfacl -m u:nginx:rx /;
setfacl -m u:nginx:rx /var;
setfacl -R -m u:nginx:r /var/log;
setfacl -m u:nginx:rx /var/log;
setfacl -R -m u:nginx:rwx /rov-web;

# ---- setup the rov-web folder to be a git repo fetching to github -----
cd /rov-web
BRANCH_NAME="${BRANCH_NAME:=main}"  # If variable not set or null, set it to default 'main'.
if [ ! -e ".git/" ]; then
    cp -r ./* /tmp/rov-web-tmp
    git init -b $BRANCH_NAME
    git remote add origin 'https://github.com/KW-M/rov-web.git'
    git fetch origin $BRANCH_NAME
        # git reset --hard origin/$BRANCH_NAME
    git config --global user.email "rov@blueos.local"
    git config --global user.name "Rov Docker Container"
    git commit -a --allow-empty -m 'Base Commit from Docker Container Build'
    git branch --set-upstream-to=origin/$BRANCH_NAME $BRANCH_NAME
fi
