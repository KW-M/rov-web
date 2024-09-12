# rov-web

### Installing on a Raspberry PI:

1. Connect the PI to the internet via Ethernet or Wifi.
2. Clone this repo to the rasberry pi home folder by running `cd ~/` Then `git clone https://github.com/KW-M/rov-web.git` in a terminal (cmd prompt) or ssh session.
3. `cd ./rov-web` to get into the cloned folder.
4. Run `sudo chmod +x ./tooling/rasberry_pi_setup_scripts/START_HERE.sh` to mark the setup script as executable.
5. Run the setup with `./tooling/rasberry_pi_setup_scripts/START_HERE.sh`
6. Reboot.

## running/testing locally

run this below command in a terminal window.

```sh
python3 ./rov_backend/python/main.py --config-file ./tooling/rasberry_pi_setup_scripts/new_config_files/rov-config.json
```

### My development workflow

1. Make changes to the config files or python code in the rov-web folder. - I like using the visual studio code remote ssh extension to edit code on the pi.
2. run **./tooling/rasberry_pi_setup_scripts/fetch_changes.sh** to replace the configs in system folders with the new ones in the rov-web folder and then it restarts all the services and python code.
3. Test.
4. If I need to install something or add a new kind of config file, add the commands I used to the end of setup_internet_rov.sh and/or rasberry_pi_setup_scripts/fetch_changes.sh with a comment or link explaining why or how to do the same thing manually.

### Raspberry Pi Software Organization

(How the different parts of the ROV code work together)

**START_HERE.sh**

> Script to run all the commands to install everything and put it in the right places. After first successful run, it puts a marker file on the desktop, so that subsequent runs of the script will only update changed config files from the /new-config-files folder in the rov code folder and restart all the systemd services, instead of downloading everything again. I tried to comment it well so please see the links for more info about each part inside the script.

**internal-backend-webpage**

> \- configured using URL parameters when the internal-webpage is opened on the PI.
>
> Relay that handles sending the video and two way data over the wire using the webRTC protocol.
> Behind the scenes it initially opens a "web socket" to our livekit cloud signalling server instance that allow the remote driver's computer and the raspberry pi locate and talk to each other over the internet. Then the livekit sdk establishes a connection to the livekit cloud server for video and data transport. Then the remote driver's browser opens a webRTC data channel that go directly between the driver’s computer and the raspberry pi (no server in between). Then the rov opens (aka "media calls") the driver with the vide stream in a WEBRTC "media channel". The website Javascript uses the Livekit that handles all the handshakes and keeps a steady connection and also simplePeer for the direct webRTC connection.

**Python3**

> Recives and sends "wrapped" protobuf messages with the internal-webpage through a _LOCAL_ websocket connection. The internal-webpage then forwards these messages over webRTC to any drivers spectators depending on the metadata sent by the python. The python code is also responsible for keeping track of authenticated drivers and handling all the user actions and rov control logic.

> The frontend sends updates as protobuf encoded bytes whenever the driver moves the game controller joysticks with the calculated desired velocity of the rov. The python then drives the motor controllers such that the rov achives that thrust direction. If no driver is connected, no driver messages are recived recently, or exceptions are raised in the python code, it stops all motors until one of those conditions changes (see bottom of message_handler.py).

**Systemd**

- Built in service of rasberry pi.

- Everything above is started when the raspberry pi boots up and kept in check using what are called systemd services which are configured using the name_of_a_program.service files in the new_config_files/ folder.

Each service is supossed to be restarted by systemd if it crashes.

**nginx**

> A widely used web server.
>
> \- configured using nginx.config
>
> We are using it to:
>
> 1. When public internet access is unavailable it can "serve" or send all of the static website html/css/javascript to the driver’s web browser locally so they get a nice user interface that handles all the user side stuff.
>
> 2. Show various logs/debugging stuff on convenient url paths locally.
>
> 3. (If we use ngrok in the future) Funnel all the connections we need to/from the raspberry pi through the default internet port (:80) because ngrok can only tunnel one port. Also "proxy-pass" the ngrok dashboard to url path /ngrok_dashboard/ on port 80

### Building the ROV

See "ROV BUILD GUIDE.md" (ask Kyle for it)
