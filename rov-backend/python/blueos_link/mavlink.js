var ws = new WebSocket("ws://blueos.attlocal.net:6040/ws/mavlink");
ws.onopen = function () {
    console.log("Sending Opened connection to websocket");

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function sendHeartbeat() {
        while (true) {
            console.log("Sending heartbeat");
            ws.send(JSON.stringify(
                {
                    "header": {
                        "system_id": 255,
                        "component_id": 240,
                        "sequence": 0
                    },
                    "message": {
                        "type": "HEARTBEAT",
                        "custom_mode": 0,
                        "mavtype": { "type": "MAV_TYPE_GCS" },
                        "autopilot": { "type": "MAV_AUTOPILOT_INVALID" },
                        "base_mode": { "bits": 192 },
                        "system_status": { "type": "MAV_STATE_ACTIVE" },
                        "mavlink_version": 1
                    }
                }
            ));
            await sleep(1000);
        }
    }

    async function sendArm() {
        ws.send(JSON.stringify(
            {
                "header": {
                    "system_id": 255, "component_id": 240, "sequence": 0
                },
                "message": {
                    "type": "COMMAND_LONG",
                    "param1": 1,
                    "param2": 0,
                    "param3": 0,
                    "param4": 0,
                    "param5": 0,
                    "param6": 0,
                    "param7": 0,
                    "command": { "type": "MAV_CMD_COMPONENT_ARM_DISARM" },
                    "target_system": 1,
                    "target_component": 1,
                    "confirmation": 0
                }
            }
        ));
    }

    async function sendDisarm() {
        ws.send(JSON.stringify(
            { "header": { "system_id": 255, "component_id": 240, "sequence": 0 }, "message": { "type": "COMMAND_LONG", "param1": 0, "param2": 0, "param3": 0, "param4": 0, "param5": 0, "param6": 0, "param7": 0, "command": { "type": "MAV_CMD_COMPONENT_ARM_DISARM" }, "target_system": 1, "target_component": 1, "confirmation": 0 } }
        ));
    }


    async function sendMove() {
        var flop = false;
        while (true) {
            // flop = !flop;
            // if (flop) {
            //     console.log("Sending nomove");
            //     ws.send(JSON.stringify(
            //         { "header": { "system_id": 255, "component_id": 240, "sequence": 0 }, "message": { "type": "MANUAL_CONTROL", "x": 0, "y": 0, "z": 500, "r": 0, "buttons": 1536, "target": 1 } }
            //     ));
            //     await sleep(1000);
            // } else {
            console.log("Sending move");
            ws.send(JSON.stringify(
                {
                    "header": {
                        "system_id": 255,
                        "component_id": 240,
                        "sequence": 0
                    }, "message": {
                        "type": "MANUAL_CONTROL",
                        "x": 500, "y": 0, "z": 500, "r": 200, "buttons": 0, "target": 1
                    }
                }
            ));
            await sleep(1000);
            // }

        }
    }


    async function switchMode() {
        var i = 0;
        while (true) {
            i = (i + 1) % 9;
            console.log("Sending chnage mode" + i);
            ws.send(JSON.stringify(
                {
                    "header": {
                        "system_id": 255,
                        "component_id": 240,
                        "sequence": 0
                    },
                    "message": {
                        "type": "COMMAND_LONG",
                        "param1": 1,
                        "param2": i,
                        "param3": 0,
                        "param4": 0,
                        "param5": 0,
                        "param6": 0,
                        "param7": 0,
                        "command": {
                            "type": "MAV_CMD_DO_SET_MODE"
                        },
                        "target_system": 1,
                        "target_component": 1,
                        "confirmation": 0
                    }
                }
            ));
            await sleep(1000);
        }
    }




    async function toggleArm() {
        var flop = false;
        while (true) {

            flop = !flop;
            if (flop) {
                console.log("Sending arm");
                await sendArm();
                await sleep(800);
            } else {
                console.log("Sending disarm");
                await sendDisarm();
                await sleep(8500);
            }

        }
    }

    sendHeartbeat();
    toggleArm();
    sendMove();
    // switchMode();

    ws.onmessage = function (evt) {
        console.log("Got:" + evt.data);
    }
}
