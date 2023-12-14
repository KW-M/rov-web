import type { nStoreT } from "./libraries/nStore";


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
 * wrapper function that takes an async function and keeps retrying with exponential backoff if the wrapped function throws an error (ie the internal promise rejects)
 * if the function fails after maxRetries, it throws an error to be handled by higher up functions.
 */
export function asyncExpBackoff<F extends (...args: any[]) => Promise<any>>(fn: F, thisArg: any = null, maxRetries: number = 5, initialDelay: number = 1000, rate: number = 2): F {
    return async function (...args: any[]) {
        let error;
        let retries = 0;
        while (retries < maxRetries) {
            try {
                return await fn.apply(thisArg, args)
            } catch (err) {
                error = err;
                console.warn("err:", error)
                await waitfor(initialDelay * Math.pow(rate, retries));
                retries++;
            }
        }
        throw new Error("asyncExpBackoff() func failed after " + retries + " retries. Error: " + error)
    } as F
}

export function changesSubscribe<V>(store: nStoreT<V>, callback: (value: V) => void) {
    let gotInitalValueFlag = false;
    const unSub = store.subscribe((value) => {
        if (gotInitalValueFlag == false) {
            gotInitalValueFlag = true;
            return;
        }
        callback(value);
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


export const appendLog = console.log
// (...args: any[]) {
//     console.log(...args)
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
