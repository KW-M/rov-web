import { EMOJI_MAP, ROV_PEERID_BASE } from "./consts";

export function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min)
}

export function getDayOfYear(date = new Date()) {
    const timestamp1 = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
    const differenceInMilliseconds = timestamp1 - timestamp2;
    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;
    return differenceInDays;
}

export class Queue {
    //https://www.geeksforgeeks.org/implementation-queue-javascript/

    constructor() {
        // Array is used to implement a Queue
        this.items = [];
    }


    push(element) {
        // adding element to the queue
        this.items.push(element);
    }

    pop() {
        // removing element from the queue
        // returns underflow when called
        // on empty queue
        if (this.isEmpty())
            return undefined;
        return this.items.shift();
    }

    peak() {
        // returns the Front element of
        // the queue without removing it.
        if (this.isEmpty())
            return undefined;
        return this.items[0];
    }

    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

export function emojiOfTheDay() {
    let dayOfYear = getDayOfYear();
    console.log(dayOfYear, EMOJI_MAP)
    return EMOJI_MAP[dayOfYear]
}

export function hexToEmojiEncoding(hexString, itterCount) {
    var out = ""
    var emojiCount = BigInt(EMOJI_MAP.length)
    hexString = "0x" + hexString
    console.log(hexString, emojiCount);
    var value = BigInt(hexString);
    console.log("BigInt", value);
    while (itterCount > 0 && value > 0) {
        let index = Number(value % emojiCount)
        console.log("new mod ", index)
        out += EMOJI_MAP[index];
        value = value / emojiCount;
        itterCount--
    }
    return out
}

const adjectives = [
    "Autumn", "Hidden", "Bitter", "Misty", "Silent", "Empty", "Dry", "Dark", "Summer", "Icy",
    "Delicate", "Quiet", "White", "Cool", "Spring", "Winter", "Patient", "Twilight", "Dawn",
    "Crimson", "Wispy", "Weathered", "Blue", "Billowing", "Broken", "Cold", "Damp", "Falling",
    "Frosty", "Green", "Long", "Late", "Lingering", "Bold", "Little", "Morning", "Muddy", "Old",
    "Red", "Rough", "Still", "Small", "Sparkling", "Wandering", "Withered", "Wild", "Black",
    "Young", "Holy", "Solitary", "Fragrant", "Aged", "Snowy", "Proud", "Floral", "Restless",
    "Divine", "Polished", "Ancient", "Purple", "Lively", "Nameless"];
const nouns = [
    "Waterfall", "River", "Breeze", "Moon", "Rain", "Wind", "Sea", "Morning", "Snow", "Lake",
    "Sunset", "Pine", "Shadow", "Leaf", "Dawn", "Glitter", "Forest", "Hill", "Cloud", "Meadow",
    "Sun", "Glade", "Bird", "Brook", "Butterfly", "Bush", "Dew", "Dust", "Field", "Fire",
    "Flower", "Firefly", "Feather", "Grass", "Haze", "Mountain", "Night", "Pond", "Darkness",
    "Snowflake", "Silence", "Sound", "Sky", "Shape", "Surf", "Thunder", "Violet", "Water",
    "Wildflower", "Wave", "Water", "Resonance", "Sun", "Wood", "Dream", "Cherry", "Tree", "Fog",
    "Frost", "Voice", "Paper", "Frog", "Smoke", "Star"];

export function getRandomName() {
    // from: https://gist.github.com/nwjlyons/61b6c5680c53d7da8baf7245aac7a970
    var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    var noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + "-" + noun;
}

export function getDailyName(offset) {
    // from: https://gist.github.com/nwjlyons/61b6c5680c53d7da8baf7245aac7a970
    offset = Math.floor(Math.max(1, offset + 1));
    let dayOfYear = getDayOfYear();
    var adjective = adjectives[(offset + dayOfYear) % adjectives.length];
    var noun = nouns[(offset * dayOfYear) % nouns.length];
    return adjective + "-" + noun;
}

/* generateStateChangeFunction is a function generator for an xstate machine that will return a function that will run a callback and send the named state transition with the data or event from the calling transition */
export function generateStateChangeFunction(sendStateChange, stateTransition, data, additionalCallback) {
    const func = function (evt) {
        if (additionalCallback) additionalCallback(evt)
        sendStateChange({ type: stateTransition, data: (data || evt) });
    }
    return func;
}

/*
* Gets just the passed name parameter from the query string the curent url:
* Example: if the url is: https://example.com/abc?some-variable-name=somevalue&someotherthing=someothervalue
* then getURLQueryStringVariable("some-variable-name") will return "somevalue"
*/
export function getURLQueryStringVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    // console.log('Query variable %s not found', variable);
}

export function isInternetAvailable(urlToCheck) {
    return new Promise((resolve) => {
        console.info("checkingUrl", urlToCheck);
        try {
            fetch(urlToCheck).then(() => { resolve(true) }).catch((e) => {
                console.warn("Internet Offline, starting switch to local mode", e)
                resolve(false)
            });
            // setTimeout(() => {
            //     resolve(false)
            // }, 10000)
        } catch (e) {
            console.warn("Error Checking internet, starting switch to local mode", e)
            resolve(false)
        }
    })
}

// @ts-ignore
window.closeFullscreen = () => {
    // @ts-ignore
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenElement) {
        const removeFullscreenUi = () => {
            fullscreenElement.classList.remove('fullscreen-open');
        };
        if (document.exitFullscreen) {
            document.exitFullscreen().then(removeFullscreenUi);
            // @ts-ignore
        } else if (document.msExitFullscreen) {
            // @ts-ignore
            document.msExitFullscreen().then(removeFullscreenUi);
            // @ts-ignore
        } else if (document.mozCancelFullScreen) {
            // @ts-ignore
            document.mozCancelFullScreen().then(removeFullscreenUi);
            // @ts-ignore
        } else if (document.webkitExitFullscreen) {
            // @ts-ignore
            document.webkitExitFullscreen().then(removeFullscreenUi);
        }
    }
}

/* When the toggleFullscreen() export function is executed, open the passed element in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
// @ts-ignore
window.toggleFullscreen = (e, elem) => {
    elem = elem || document.documentElement;
    if (e && e.initialTarget) e.initialTarget.classList.toggle('fullscreen-open');
    // @ts-ignore
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

    const addFullscreenUi = () => {
        elem.classList.add('fullscreen-open');
    };

    const removeFullscreenUi = () => {
        fullscreenElement.classList.remove('fullscreen-open');
        if (elem !== fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().then(addFullscreenUi);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen().then(addFullscreenUi);
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen().then(addFullscreenUi);
            } else if (elem.webkitRequestFullscreen) {
                // @ts-ignore
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(addFullscreenUi);
            }
        }
    };

    if (fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(removeFullscreenUi);
        }
        //  else if (document.msExitFullscreen) {
        //     document.msExitFullscreen().then(removeFullscreenUi);
        // } else if (document.mozCancelFullScreen) {
        //     document.mozCancelFullScreen().then(removeFullscreenUi);
        // } else if (document.webkitExitFullscreen) {
        //     document.webkitExitFullscreen().then(removeFullscreenUi);
        // }
    } else {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().then(addFullscreenUi);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen().then(addFullscreenUi);
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen().then(addFullscreenUi);
        } else if (elem.webkitRequestFullscreen) {
            // @ts-ignore
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).then(addFullscreenUi);
        }
    }
}

// @ts-ignore
export function toggleFullscreen(event, elem) {
    elem = elem || document.documentElement;
    // @ts-ignore
    var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (!fullscreenElement || elem !== fullscreenElement) {
        const requestFullscreenFunc = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        console.log(requestFullscreenFunc)
        // @ts-ignore
        requestFullscreenFunc(Element.ALLOW_KEYBOARD_INPUT)
    } else {
        // @ts-ignore
        const exitFullscreenFunc = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exitFullscreenFunc().then(() => {
            fullscreenElement.classList.remove('fullscreen-open');
        });
    }
}

// Downloads the given link, with an optional filename for the download
export function download(url, filename) {
    const a = document.createElement('a') // Create <a> hyperlink element
    a.href = url // Set the hyperlink URL
    a.download = filename || "" // if left blank the browser will guess the filename for the downloaded file
    document.body.appendChild(a) // Append the hyperlink to the document body
    a.click() // Click the hyperlink
    document.body.removeChild(a) // Remove the hyperlink from the document body
}


//scanForRovIp().then(console.log, console.warn);

// function findRovLocalIp() {

//     var interval = null;
//     var rovLocalIp = null;
//     var testPopup = null;




//     const popupMessageHandler = (msg) => {
//         if (typeof msg.data == typeof "string") {
//             var parts = msg.data.split(": ");
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
// // var rovLocalIp = null;
// // var currentIpComboArrayIndex = 0;
// // var ipCombos = ["raspberrypi.local"];
// // for (var octet = 0; octet < 255; octet++) {
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
// //   //       var parts = msg.data.split(": ");
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
// //     var popupWindows = [];
// //     for (var i = 0; i < 2; i++) {
// //       const popup = window.open(
// //         ``, //http://${ipCombos[i]}/ipResponder
// //         "ROV IP FINDER " + i,
// //         `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=6,height=3,left=${
// //           (i * 200) % window.screen.width
// //         },top=${Math.floor((i * 200) / window.screen.width) * 300}`
// //       );
// //       // var countdown = 10000;
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
// //     var iframe = document.createElement('iframe');
// //     iframe.src = url;
// //     iframe_container.appendChild(iframe);
// //     document.writeln(url)
// // }
// //
// // // if (window.isSecureContext) {
// // //     // downgrade to insecure connection to allow iframes from rov
// // //     window.location.protocol = 'http:'
// // // } else {
// // var rovLocalIp = null;
// // var thirdIpOctet = 0;
// // var iframe_container = document.getElementById("iframe_container")
// // // try to brute force search for raspberrypi's ip address...
// // // ... in iframes to get around browser local network cross origin protections
// // window.addEventListener("message", (msg) => {
// //     if (typeof (msg.data) == typeof ("string")) {
// //         alert("ROV IP FOUND! " + rovLocalIp)
// //         //pass up the chain
// //         parentWindow = window.opener || window.parent
// //         parentWindow.postMessage(msg.data, "*")
// //         // var parts = msg.data.split(": ")
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
// var rovLocalIp = null
// var rovIpFound = false;
// function findRovLocalIp() {
//     // try to brute force search for raspberrypi's ip address
//     console.info("Searching for raspberrypi local ip address...")
//     currentThirdOctet = -1
//     var scriptElem = null
//     function testIp(ipAddress) {
//         return new Promise(function (resolve, reject) {
//             console.info("Testing: ", ipAddress)
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
//         console.info("ROV IP FOUND! " + rovLocalIp)
//     })
// }


// var media = document.getElementById('video-livestream');

// // Playing event
// var isStalled = function (e) { console.log(e, "Playback Stalled"); };

// var isWaiting = function (e) { console.log(e, "Waiting for content"); };

// var isPlaying = function (e) { console.log(e, "Playing event triggered"); };

// // Pause event
// var onPause = function (e) { console.log(e, "Pause event triggered"); };

// // Volume changed event
// var onVolumechange = function (e) { console.log(e, "Volumechange event triggered"); };

// media.addEventListener("playing", isPlaying, false);
// media.addEventListener("stalled", isStalled, false);
// media.addEventListener("waiting", isWaiting, false);
// media.addEventListener("pause", onPause, false);
// media.addEventListener("volumechange", onVolumechange, false);
