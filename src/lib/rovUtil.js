
import { getUniqueName } from "./util"
import { ROV_PEERID_BASE, MEMORABLE_PEER_ID_OFFSET } from "./consts";


export function getROVName(rovPeerIdEndNumber) {
    return ROV_PEERID_BASE + getUniqueName(rovPeerIdEndNumber, MEMORABLE_PEER_ID_OFFSET)
}

export function calculateDesiredMotion(axes) {
    var turn = Number(axes[0].toFixed(3));
    var forward = -1 * Number(axes[1].toFixed(3));
    var strafe = Number(axes[2].toFixed(3));
    var vertical = -1 * Number(axes[3].toFixed(3));
    return {
        VelocityX: strafe,
        VelocityY: forward,
        VelocityZ: vertical, // vector in the form [x,y,z]
        AngularVelocityYaw: turn,
    }
}

export function scanForRovIp() {
    // make the list of possible rov IPs
    var currentIpComboArrayIndex = 0;
    // const ipCombos = ["raspberrypi.local:9000"];
    // for (var octet = 0; octet < 255; octet++) {
    //     ipCombos.push(`192.168.${octet}.88:9000`);
    // }

    // Debug version (while on wifi)
    const ipCombos = [];
    for (var octet = 0; octet < 6; octet++) {
        ipCombos.push(`10.0.0.${octet}:9000`);
    }

    return new Promise((resolve, reject) => {
        let foundIp = false;
        let interval = setInterval(() => {
            let currentlyTestingIp = ipCombos[currentIpComboArrayIndex];
            console.log(`Testing IP ${currentIpComboArrayIndex}/${ipCombos.length}: ${currentlyTestingIp} ...`)
            try {
                var s = new WebSocket("wss://" + currentlyTestingIp)
                if (s) {
                    s.addEventListener("error", console.warn)
                    s.addEventListener("open", (o) => console.log("open", o))
                }
                else console.log("WebSocket is undefined");
            } catch (e) {
                console.log(currentlyTestingIp, e)
            }
            if (foundIp) {
                clearInterval(interval);
                alert("ROV IP FOUND: " + currentlyTestingIp);
                resolve(currentlyTestingIp);
            } else if (currentIpComboArrayIndex == ipCombos.length - 1) {
                clearInterval(interval);
                reject("Ip Not Found");
            }
            currentIpComboArrayIndex++;
        }, 200);
    })
}
