https://github.com/ArduPilot/pymavlink
```sh
cd ~
git clone https://github.com/ArduPilot/mavlink.git
cd ~
git clone https://github.com/ArduPilot/pymavlink.git
python3 pymavlink/setup.py build install --user
mkdir mavlink_TS
python3 -m pymavlink.tools.mavgen --lang=TypeScript --wire-protocol=2.0 --output=mavlink_TS mavlink/message_definitions/v1.0/ardupilotmega.xml
```
