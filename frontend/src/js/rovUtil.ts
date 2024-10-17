
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"

export function calculateDesiredMotion(axes) {
    let turn = Number(axes[0].toFixed(3));
    let forward = -1 * Number(axes[1].toFixed(3));
    let strafe = Number(axes[2].toFixed(3));
    let vertical = -1 * Number(axes[3].toFixed(3));
    return {
        velocityX: forward,
        velocityY: strafe,
        velocityZ: vertical,
        angularVelocityYaw: turn,
    }
}

export function scanForRovIp() {
    // make the list of possible rov IPs
    let currentIpComboArrayIndex = 0;
    // const ipCombos = ["raspberrypi.local:9000"];
    // for (let octet = 0; octet < 255; octet++) {
    //     ipCombos.push(`192.168.${octet}.88:9000`);
    // }

    // Debug version (while on wifi)
    const ipCombos = [];
    for (let octet = 0; octet < 6; octet++) {
        ipCombos.push(`10.0.0.${octet}:9000`);
    }

    return new Promise((resolve, reject) => {
        let foundIp = false;
        let interval = setInterval(() => {
            let currentlyTestingIp = ipCombos[currentIpComboArrayIndex];
            log(`Testing IP ${currentIpComboArrayIndex}/${ipCombos.length}: ${currentlyTestingIp} ...`)
            try {
                let s = new WebSocket("wss://" + currentlyTestingIp)
                if (s) {
                    s.addEventListener("error", logWarn)
                    s.addEventListener("open", (o) => log("open", o))
                }
                else log("WebSocket is undefined");
            } catch (e) {
                log(currentlyTestingIp, e)
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



//scanForRovIp().then(log, logWarn);

// function findRovLocalIp() {

//     let interval = null;
//     let rovLocalIp = null;
//     let testPopup = null;




//     const popupMessageHandler = (msg) => {
//         if (typeof msg.data == typeof "string") {
//             let parts = msg.data.split(": ");
//             if (parts[0] == "ROV_IP") {
//                 rovLocalIp = parts[1];
//                 clearInterval(interval);
//                 testPopup.close();
//                 alert("ROV IP FOUND! " + rovLocalIp);
//                 window.removeEventListener("message", popupMessageHandler, false);
//                 resolve();
//             }
//         }
//     };
//     window.addEventListener("message", popupMessageHandler, false);

//     // open the popup window
//     testPopup = window.open(
//         "",
//         "ROV IP FINDER",
//         "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=6,height=3,left=0,top=0"
//     );
//     window.focus();

//     testPopup.document.body.innerHTML = `Scanning for ROV IP...<br/>May take up to 4 minutes<img onload="
//          window.onbeforeunload=()=>{
//            document.writeln('Checkindg ROV IP ${currentIpComboArrayIndex}/${ipCombos.length}: ${ipCombos[currentIpComboArrayIndex]} ...');
//            window.close()
//          };
//        " src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" >`;

//     currentIpComboArrayIndex--; // so we start at zero
//     interval = setInterval(() => {
//         currentIpComboArrayIndex++;
//         try {
//             if (testPopup.closed) throw "popup was closed";
//             if (currentIpComboArrayIndex >= ipCombos.length)
//                 throw "reached end of possible IP addresses";
//             testPopup.stop();
//             testPopup.location = `http://${ipCombos[currentIpComboArrayIndex]}/ipResponder`;
//         } catch (e) {
//             if (testPopup && testPopup.open) testPopup.close();
//             clearInterval(interval);
//             if (rovLocalIp == null) {
//                 alert(
//                     `ROV IP scan stopped because ${e}. Click Scan button again to continue...`
//                 );
//             }
//             window.removeEventListener("message", popupMessageHandler, false);
//         }
//     }, 1000);
// }

// // ---- multiple popup attempt: ----
// // -------------------------------
// // let rovLocalIp = null;
// // let currentIpComboArrayIndex = 0;
// // let ipCombos = ["raspberrypi.local"];
// // for (let octet = 0; octet < 255; octet++) {
// //   ipCombos.push(`192.168.${octet}.88`);
// // }
// // function scanForRovIp() {

// //   document.writeln(ipCombos.join("<br/>"));
// // }

// // function findRovLocalIp() {
// //   // window.addEventListener(
// //   //   "message",
// //   //   (msg) => {
// //   //     if (typeof msg.data == typeof "string") {
// //   //       let parts = msg.data.split(": ");
// //   //       if (parts[0] == "ROV_IP") {
// //   //         rovLocalIp = parts[1];
// //   //         clearInterval(interval);
// //   //         testPopup.close();
// //   //         alert("ROV IP FOUND! " + rovLocalIp);
// //   //         resolve();
// //   //       }
// //   //     }
// //   //   },
// //   //   false
// //   // );
// //   return new Promise((resolve, reject) => {
// //     let popupWindows = [];
// //     for (let i = 0; i < 2; i++) {
// //       const popup = window.open(
// //         ``, //http://${ipCombos[i]}/ipResponder
// //         "ROV IP FINDER " + i,
// //         `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=6,height=3,left=${
// //           (i * 200) % window.screen.width
// //         },top=${Math.floor((i * 200) / window.screen.width) * 300}`
// //       );
// //       // let countdown = 10000;
// //       // setInterval(() => {
// //       //   document.write('Checking IP: ${ipCombos[i]}' + (countdown--));
// //       //   if(countdown <= 0) window.close();
// //       // },1);
// //       popup.document.body.innerHTML = `<img onload="
// //         document.write('Checking IP: ${ipCombos[i]}');
// //         window.onbeforeunload=()=>{
// //           document.writeln('Nope IP: ${ipCombos[i]}');
// //           window.close()
// //         };
// //         window.location='http://${ipCombos[i]}/ipResponder'
// //       " src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" >`;
// //       if (!popup.open) {
// //         alert(
// //           "Please allow popups in your browser, and don't close the popups. Then try scanning again."
// //         );
// //         return reject();
// //       }
// //       window.focus();
// //       popupWindows.push(popup);
// //     }
// //     interval = setTimeout(() => {
// //       while (popupWindows.length > 0) {
// //         const popupWin = popupWindows.pop();
// //         if (popupWin.open) popupWin.close();
// //       }
// //     }, 20000);
// //     //http://raspberrypi.local/ipResponder
// //     window.focus();
// //   });
// // }

// // ----- old iframe attempt: -------
// // ------------------------------------
// // function iframeTester(url) {
// //     let iframe = document.createElement('iframe');
// //     iframe.src = url;
// //     iframe_container.appendChild(iframe);
// //     document.writeln(url)
// // }
// //
// // // if (window.isSecureContext) {
// // //     // downgrade to insecure connection to allow iframes from rov
// // //     window.location.protocol = 'http:'
// // // } else {
// // let rovLocalIp = null;
// // let thirdIpOctet = 0;
// // let iframe_container = document.getElementById("iframe_container")
// // // try to brute force search for raspberrypi's ip address...
// // // ... in iframes to get around browser local network cross origin protections
// // window.addEventListener("message", (msg) => {
// //     if (typeof (msg.data) == typeof ("string")) {
// //         alert("ROV IP FOUND! " + rovLocalIp)
// //         //pass up the chain
// //         parentWindow = window.opener || window.parent
// //         parentWindow.postMessage(msg.data, "*")
// //         // let parts = msg.data.split(": ")
// //         // if (parts[0] == "ROV_IP") {
// //         //     rovLocalIp = parts[1]
// //         //     alert("ROV IP FOUND! " + rovLocalIp)
// //         //     // window.opener.p
// //         // }
// //     }
// // }, false)
// // iframeTester("http://raspberrypi.local/ipResponder")
// // for (let thirdIpOctet = 0; thirdIpOctet < 255; thirdIpOctet++) {
// //     iframeTester("http://192.168." + thirdIpOctet + ".88/ipResponder");
// // }
// // // }

// // ----- old script element attempt: -------
// // -----------------------------------------
// let rovLocalIp = null
// let rovIpFound = false;
// function findRovLocalIp() {
//     // try to brute force search for raspberrypi's ip address
//     logInfo("Searching for raspberrypi local ip address...")
//     currentThirdOctet = -1
//     let scriptElem = null
//     function testIp(ipAddress) {
//         return new Promise(function (resolve, reject) {
//             logInfo("Testing: ", ipAddress)
//             if (scriptElem) document.body.removeChild(scriptElem)
//             scriptElem = document.createElement("SCRIPT")
//             scriptElem.setAttribute("src", "http://" + ipAddress)
//             document.body.appendChild(scriptElem)
//             setTimeout(function () {
//                 resolve()
//             }, 500)
//         }).then(function () {
//             if (rovIpFound == true) {
//                 return ipAddress
//             } else {
//                 currentThirdOctet = (currentThirdOctet + 1) % 255
//                 return testIp("192.168." + currentThirdOctet + ".88/alive")
//             }
//         })
//     }
//     testIp("192.168." + 0 + ".88/alive").then((localIp) => {
//         rovLocalIp = localIp;
//         logInfo("ROV IP FOUND! " + rovLocalIp)
//     })
// }


// let media = document.getElementById('video-livestream');

// // Playing event
// let isStalled = function (e) { log(e, "Playback Stalled"); };

// let isWaiting = function (e) { log(e, "Waiting for content"); };

// let isPlaying = function (e) { log(e, "Playing event triggered"); };

// // Pause event
// let onPause = function (e) { log(e, "Pause event triggered"); };

// // Volume changed event
// let onVolumechange = function (e) { log(e, "Volumechange event triggered"); };

// media.addEventListener("playing", isPlaying, false);
// media.addEventListener("stalled", isStalled, false);
// media.addEventListener("waiting", isWaiting, false);
// media.addEventListener("pause", onPause, false);
// media.addEventListener("volumechange", onVolumechange, false);
