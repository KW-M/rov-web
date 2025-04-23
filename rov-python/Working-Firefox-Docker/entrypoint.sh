#!/bin/bash

export DISABLE_RTKIT=y
#export XDG_RUNTIME_DIR=/tmp
#export PIPEWIRE_RUNTIME_DIR=/tmp
#export PULSE_RUNTIME_DIR=/tmp

export XDG_RUNTIME_DIR=/run/user/1000
export PIPEWIRE_RUNTIME_DIR=/run/user/1000

# Start dbus
#mkdir -p /run/dbus
#mkdir -p /dev/snd
#dbus-daemon --system --fork
#export DBUS_SESSION_BUS_ADDRESS=`dbus-daemon --fork --config-file=/usr/share/dbus-1/session.conf --print-address`

# Start rtkit
#/usr/libexec/rtkit-daemon &

# Start Xvfb in the background
#echo "Setup Xvfb..."
#Xvfb $DISPLAY -screen 0 1280x720x24 -ac +extension GLX +render -noreset &

# Start x11vnc
#echo "Setup x11vnc..."
#x11vnc -display $DISPLAY -forever -noxdamage -shared -nopw -quiet &

# Start pipewire server
#echo "Starting pipewire..."
#pipewire &
#wireplumber &
#pipewire-pulse &


#exec /bin/bash
python3 ff_test.py
