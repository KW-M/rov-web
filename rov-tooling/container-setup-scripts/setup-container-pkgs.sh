#!/bin/bash
set -e # exit on error
set -u # exit on undefined variable
set -o pipefail # exit if any command in a pipe fails

# Install system packages:
apt-get update -y --fix-missing
apt install -y man nano unzip curl wget git supervisor acl apt-utils dbus-x11 xvfb python3 python3-venv python3-distutils python3-pip python3-numpy python3-lxml chromium chromium-driver
apt-get autoremove -y

# Setup python virtual environment (venv) to avoid conflicts with system packages:
python3 -m venv /env
PATH="/env/bin:$PATH"

# Install python packages:
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade setuptools
python3 -m pip install -r /rov-web/rov-python/requirements.txt
# python3 -m playwright install chromium --with-deps

# Create pi user:
groupadd pi
useradd --system --gid pi --groups nginx,video --home /home/pi --comment "pi user for running our code / compatibility with raspberry pi defaults" --shell /bin/bash pi
mkdir -p /home/pi && chown pi: /home/pi;
