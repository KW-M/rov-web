import type { nStoreT } from "./libraries/nStore";
import { log, logDebug, logInfo, logWarn, logError } from "./logging"

export function waitfor(millisec: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => { resolve() }, millisec);
    })
}


export function waitforCondition(condition: () => boolean, millisec: number = 0) {
    return new Promise<void>((resolve, reject) => {
        if (millisec !== 0) setTimeout(() => { reject() }, millisec);
        const interval = setInterval(() => {
            if (condition()) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    })
}

/**
 * wrapper function that takes an async function or promise and keeps retrying it with exponentially longer delays
 * until the promise resolves or a retry limit is reached.
 * if the function fails after maxRetries, it throws an error with the last caught error to be handled by higher up functions.
 */
export function asyncExpBackoff<F extends () => Promise<any>>(opts: { fn: F, maxRetries: number, initialDelay: number, exponent: number }): { promise: ReturnType<F>, cancel: () => void } {
    const fn = opts.fn;
    const maxRetries = opts.maxRetries ?? 3;
    const initialDelay = opts.initialDelay ?? 100;
    const exponent = opts.exponent ?? 2;
    let cancel = false;
    return {
        promise: new Promise(async function (resolve, reject) {
            let error: Error;
            let retries = 0;
            while (retries < maxRetries) {
                try {
                    const result = await fn();
                    if (cancel) return reject(null);
                    return resolve(result);
                } catch (err: any) {
                    logWarn("err:", error = err);
                    if (cancel) {
                        err.message += " - asyncExpBackoff() canceled"
                        return reject(err);
                    }
                    await waitfor(initialDelay * Math.pow(exponent, retries));
                    retries++;
                }
            }
            error.message += " - asyncExpBackoff() failed after " + retries + " retries"
            reject(error);
        }) as ReturnType<F>,
        cancel: () => {
            cancel = true;
        }
    }
}

export function changesSubscribe<V>(store: nStoreT<V>, callback: (value: V, prevValue: V) => void) {
    let gotInitalValueFlag = false;
    let prevValue = store.get();
    const unSub = store.subscribe((value) => {
        if (gotInitalValueFlag == false) {
            gotInitalValueFlag = true;
            prevValue = value;
            return;
        }
        callback(value, prevValue);
        prevValue = value;
    });
    return unSub;
}

export function oneShotSubscribe<V>(store: nStoreT<V>, callback: (value: V) => void) {
    const unSub = store.subscribe((value) => {
        if (!value) return;
        setTimeout(() => {
            unSub();
            callback(value);
        });
    });
    return unSub;
}


export const appendLog = log
// (...args: any[]) {
//     log(...args)
//     const txtElem = document.createElement('p');
//     txtElem.innerText = args.map(arg => JSON.stringify(arg)).join(' | ');
//     document.body.appendChild(txtElem)
// }

export function getWebsocketURL(urlEndpoint: string, forceSSL: boolean = false) {
    return urlEndpoint.replace("http", "ws"); // works with https:// too because wss:// is the https version
}

export function buildQueryString(userQuery) {
    //store query parameters in a temporary variable
    const query: string[] = [];
    //loop through user query object
    for (let key in userQuery) {
        //encode the keys and values this is most necessary for search inputs
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(userQuery[key]));
    }
    //construct new URL
    let new_url = window.location.toString() + (query.length ? '?' + query.join('&') : '');
    return (new_url);
}

export function getUniqueNumber() {
    const d = new Date().getTime() >>> 0; // Timestamp as unsigned integer
    const d2 = ((typeof performance !== 'undefined') && performance.now && ((performance.now() >>> 0) * 1000)) || 0 >>> 0; //Time in microseconds since page-load or 0 if unsupported
    const d3 = crypto.getRandomValues(new Uint8Array(1))[0] >>> 0
    return d * d2 * d3;
}

const adjectives = ["Ancient", "Dawn", "Small", "Broken", "Red", "Cold", "Wild", "Divine", "Empty", "Patient", "Holy", "Long", "Wispy", "White", "Delicate", "Bold", "Billowing", "Blue", "Crimson", "Aged", "Misty", "Snowy", "Withered", "Little", "Frosty", "Weathered", "Nameless", "Fragrant", "Lively", "Quiet", "Purple", "Proud", "Dry", "Bitter", "Dark", "Icy", "Twilight", "Wandering", "Solitary", "Morning", "Lingering", "Still", "Late", "Sparkling", "Restless", "Winter", "Silent", "Floral", "Young", "Green", "Cool", "Autumn", "Falling", "Spring", "Summer", "Polished", "Hidden", "Damp", "Muddy", "Black", "Old", "Rough"];
const nouns = ["Pond", "Snow", "Glade", "Hill", "Voice", "River", "Sun", "Dawn", "Forest", "Frog", "Grass", "Shadow", "Dust", "Water", "Meadow", "Moon", "Thunder", "Sun", "Wildflower", "Snowflake", "Silence", "Haze", "Shape", "Pine", "Waterfall", "Sound", "Wood", "Tree", "Night", "Flower", "Dream", "Cherry", "Resonance", "Firefly", "Bush", "Star", "Darkness", "Lake", "Frost", "Paper", "Surf", "Fog", "Brook", "Mountain", "Field", "Bird", "Leaf", "Sea", "Water", "Sky", "Smoke", "Sunset", "Glitter", "Dew", "Butterfly", "Wind", "Fire", "Rain", "Morning", "Feather", "Cloud", "Breeze", "Violet", "Wave", "Droplet", "Swamp", "Village", "Hut", "Path", "Book", "Rain", "Spell", "Pig"];
export function getHumanReadableId(number: number, offset: number = 0) {
    // https://james.darpinian.com/blog/integer-math-in-javascript
    let adjectivesLen = adjectives.length >>> 0
    let nounsLen = nouns.length >>> 0
    let maxLen = Math.max(adjectivesLen, nounsLen) >>> 0

    let numI = Math.max(1, (number + 1) % maxLen) >>> 0
    let offsetI = Math.max(1, (offset + 1) % maxLen) >>> 0

    let adjective = adjectives[(numI + offsetI) % adjectivesLen]
    let noun = nouns[(numI * offsetI) % nounsLen]
    return adjective + "-" + noun
}


export const removeUndefinedNanNumbers = <O>(obj: O): O => {
    for (const key in obj) {
        if (obj[key] === undefined || (typeof obj[key] === 'number' && isNaN(obj[key]))) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            removeUndefinedNanNumbers(obj[key]);
        }
    }
    return obj;
}
/**
 * Convert a number to binary representation as a string
 * //https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
 */
export const dec2bin = (dec: number): string => {
    return (dec | 0).toString(2).padStart(16, '0');
}
