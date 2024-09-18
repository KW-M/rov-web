#!/bin/bash

# ---- Simlink Directories -----
cd /usr/share/nginx/html/ && ln -sbfFv /rov-web/frontend/build frontend
cd /usr/share/nginx/html/ && ln -sbfFv /rov-web/rov-internal-website/build internal
cd /etc/nginx/ && ln -sbfFv /rov-web/rov-tooling/config-files/nginx.conf nginx.conf

# Create pi user:
groupadd pi --gid 1000 || true
useradd --uid 1000 --gid 1000 --groups nginx,video,audio,users --home /home/pi --create-home --shell /bin/bash --comment "pi user for running our ROV code and compatibility with raspberry pi defaults"  pi

# ---- Setup ownership and permissions -----
chown -R pi:pi /rov-web

# make sure the nginx logs exist and are owned by the nginx user and group
mkdir -p /var/log/nginx/ /var/run/ /opt/local/;
rm -rf /var/log/nginx/*;
touch /var/log/nginx/error.log;
touch /var/log/nginx/access.log;
chown -R nginx:nginx /var/log/nginx/;

# make sure the nginx user can access the directories it needs to
setfacl -m u:nginx:x /;
setfacl -m u:nginx:x /var;
setfacl -m u:nginx:rx /var/log;
setfacl -m u:nginx:rwx /var/log/nginx;
setfacl -R -m u:nginx:rx /var/log;
setfacl -R -m u:nginx:rwx /var/log/nginx;
setfacl -R -m u:nginx:rx /rov-web;

# make sure the pi user can access the directories it needs to
setfacl -m u:pi:x /;
setfacl -m u:pi:x /opt;
setfacl -m u:pi:x /var;
setfacl -m u:pi:rx /dev;
setfacl -m u:pi:rx /var/run;
setfacl -m u:pi:rx /var/log;
setfacl -R -m u:pi:rwx /var/run/;
setfacl -R -m u:pi:rwx /var/log/;
setfacl -R -m u:pi:rwx /rov-web;
# setfacl -m u:pi:rx /root;
# setfacl -m u:pi:rx /root/.cache;
# setfacl -R -m u:pi:rwx /root/.cache/ms-playwright;

# ---- setup the rov-web folder to be a git repo fetching to github -----
cd /rov-web
# BRANCH_NAME="${BRANCH_NAME:=main}"  # If variable not set or null, set it to default 'main'.
# if [ ! -e ".git/" ]; then
#     mkdir -p /tmp/rov-web-tmp
#     cp -r ./* /tmp/rov-web-tmp
#     git init -b $BRANCH_NAME
#     git remote add origin 'https://github.com/KW-M/rov-web.git'
#     git fetch origin $BRANCH_NAME
#         # git reset --hard origin/$BRANCH_NAME
#     git config --global user.email "rov@blueos.local"
#     git config --global user.name "Rov Docker Container"
#     git commit -a --allow-empty -m 'Base Commit from Docker Container Build'
#     git branch --set-upstream-to=origin/$BRANCH_NAME $BRANCH_NAME
# fi
