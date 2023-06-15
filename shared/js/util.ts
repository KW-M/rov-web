import type { nStoreT } from "./libraries/nStore";


export function waitfor(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
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


export function appendLog(...args: any[]) {
    console.log(...args)
    const txtElem = document.createElement('p');
    txtElem.innerText = args.map(arg => JSON.stringify(arg)).join(' | ');
    document.body.appendChild(txtElem)
}

export function getWebsocketURL(urlEndpoint: string, forceSSL: boolean = false) {
    return urlEndpoint.replace("http", "ws"); // works with https:// too because wss:// is the https version
}

export function buildQueryString(userQuery) {
    //store query parameters in a temporary variable
    const query: string[] = [];
    //loop through user query object
    for (var key in userQuery) {
        //encode the keys and values this is most necessary for search inputs
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(userQuery[key]));
    }
    //construct new URL
    let new_url = window.location.toString() + (query.length ? '?' + query.join('&') : '');
    return (new_url);
}
