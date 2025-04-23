#!/bin/bash
set -e # exit on error
set -u # exit on undefined variable
set -o pipefail # exit if any command in a pipe fails

# Install system packages:
apt-get update -y --fix-missing
apt install -y \
    curl \
    bash \
    man \
    nano \
    unzip \
    wget \
    git \
    acl \
    apt-utils \
    python3 \
    python3-venv \
    python3-distutils \
    python3-pip \
    python3-numpy \
    python3-lxml \
    dbus-x11 \
    psmisc \
    procps \
    xdg-utils \
    xvfb \
    software-properties-common \
    dbus-x11 \
    dbus-user-session \
    x11vnc \
    x11-utils \
    pipewire \
    pipewire-pulse \
    wireplumber \
    pipewire-audio-client-libraries \
    pulseaudio-utils \
    libportaudio2 \
    pipewire-libcamera \
    supervisor \
    firefox-esr \
    chromium-driver \
    chromium-shell
apt-get autoremove -y

# Setup python virtual environment (venv) to avoid conflicts with system packages:
python3 -m venv /env
PATH="/env/bin:$PATH"

# Install python packages:
python3 -m pip install --upgrade pip setuptools
python3 -m pip install -r /rov-web/rov-python/requirements.txt
