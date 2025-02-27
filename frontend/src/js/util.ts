/// <reference path="./globals.d.ts" />
import type { nStoreT } from './shared/libraries/nStore';
import { changesSubscribe } from './shared/util';
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"


/** wrap the callback for a keyboard event so it only fires on Enter or Space.
 * The output of this function should be passed to a keyboard event listener.
 * eg: body.addEventListener('keydown',selectKeypressFactory(log));
 * @param callback your callback function to run when the key enter or space is pressed
 * @returns return a function  will call the callback if the key is enter or space.
 */
export function selectKeypressFactory(callback: (KeyboardEvent) => void) {
    return (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') callback(e);
    }
}

export function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min)
}

/** Checks if two arrays are equal
 * @param a1 Array 1
 * @param a2 Array 2
 * @returns true if the all the array elements are equal
 */
export function arraysEqual(a1: any[], a2: any[]) {
    let i = a1.length;
    while (i--) {
        if (a1[i] !== a2[i]) return false;
    }
    return true
}

/*
* Gets just the passed name parameter from the query string the curent url:
* Example: if the url is: https://example.com/abc?some-variable-name=somevalue&someotherthing=someothervalue
* then getURLQueryStringVariable("some-variable-name") will return "somevalue"
*/
export function getURLQueryStringVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    logWarn(`Query variable ${variable} not found`);
}

// https://stackoverflow.com/questions/27078285/simple-throttle-in-javascript
export function basicThrottle(callback, limit) {
    let waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}

// underscore.js Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};



export class Queue {
    // Source: https://www.geeksforgeeks.org/implementation-queue-javascript/

    items = [];
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
        return this.items.splice(0, 1);
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
        let str = "";
        for (let i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}


export function supportsFullscreen() {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
}

/* Open the passed element in fullscreen. Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
export function toggleFullscreen(e: Event, elem: HTMLElement) {
    elem = elem || document.documentElement;
    let fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (!fullscreenElement || elem !== fullscreenElement) {
        const requestFullscreenFunc = elem.requestFullscreen || elem.webkitEnterFullscreen || elem.webkitRequestFullscreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        if (requestFullscreenFunc) requestFullscreenFunc.apply(elem);
    } else {
        const exitFullscreenFunc = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen
        if (exitFullscreenFunc) exitFullscreenFunc.apply(document);
    }
}

/*
------ Below functions are Not Used -------
*/

/** Downloads the given link, with an optional filename for the download */
export function download(url, filename) {
    const a = document.createElement('a') // Create <a> hyperlink element
    a.href = url // Set the hyperlink URL
    a.download = filename || "" // if left blank the browser will guess the filename for the downloaded file
    document.body.appendChild(a) // Append the hyperlink to the document body
    a.click() // Click the hyperlink
    document.body.removeChild(a) // Remove the hyperlink from the document body
}



/** Returns the day of year in the range 1-365 as an integer
 * @param date a JS date object (defaults to today)
 * @returns Returns the day of year
 */
export function getDayOfYear(date = new Date()): number {
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



/* generateStateChangeFunction is a function generator for an xstate machine that will return a function that will run a callback and send the named state transition with the data or event from the calling transition */
export function generateStateChangeFunction(sendStateChange, stateTransition, data, additionalCallback) {
    const func = function (evt) {
        if (additionalCallback) additionalCallback(evt)
        sendStateChange({ type: stateTransition, data: (data || evt) });
    }
    return func;
}

/**
 * Displays a number in a human readable format, with a max of 4 characters using scientific notation as neccesary.
 * @param value
 * @returns
 */
export const displayNum = (value?: number) => {
    if (value == undefined || Number.isNaN(value)) return "?";
    if (value == Infinity) return "∞";
    if (value == -Infinity) return "-∞";
    if (value < 9999) return String(value).substring(0, 4);
    else return value.toExponential(0);
};


/**
 * Displays a number of bytes in a human readable format eg 5GB 1KB 20.5MB
 * @param value
 * @returns
 */
export const displayHumanBits = (value?: number) => {
    if (value == undefined || Number.isNaN(value)) return "?b";
    else if (value == Infinity) return "∞b";
    else if (value == -Infinity) return "-∞b";
    else if (value > 1_000_000_000) return Number(value / 1_000_000_000).toFixed(2) + "Gb";
    else if (value > 1_000_000) return Number(value / 1_000_000).toFixed(2) + "Mb";
    else if (value > 1_000) return Number(value / 1_000).toFixed(2) + "Kb";
    else return value.toFixed(0) + "b";
};


/** Tailwind background color classes*/
const bgvariants = ["bg-green-900", "bg-yellow-900", "bg-red-900", "bg-blue-900", "bg-purple-900", "bg-indigo-900", "bg-gray-900", "bg-orange-900"];
const bordervariants = ["border-green-700", "border-yellow-700", "border-red-700", "border-blue-700", "border-purple-700", "border-indigo-700", "border-gray-700", "border-orange-700"];
let colorInstanceCounter = 0;

/**
 * @returns a new matched pair of tailwind color classes for a card, the first is the background color and the second is the border color
 */
export const getColors = () => {
    const bg = bgvariants[colorInstanceCounter];
    const border = bordervariants[colorInstanceCounter];
    colorInstanceCounter = (colorInstanceCounter + 1) % bgvariants.length;
    return { bg, border };
}
