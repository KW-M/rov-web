
let serverTimeOffset: number | null = null;
let performanceTimeOffset: number | null = null;
let serverTimeCheckTimerId: NodeJS.Timeout | null = null;

/** Returns the current unix timestamp in miliseconds since 1970 - adjusted to server time if available */
export const unixTimeNow = () => {
    _checkNetworkTime();
    const browserTime = Date.now();
    return serverTimeOffset != null ? browserTime + serverTimeOffset : browserTime;
}

/** Returns the current unix timestamp in miliseconds w fractional miliseconds since 1970 - adjusted to server time if available (monotonic once synced) */
export const perfUnixTimeNow = () => {
    if (!globalThis.window || window.performance == null) return unixTimeNow();
    const now = performance.now();
    if (performanceTimeOffset == null) performanceTimeOffset = Date.now() - now;
    _checkNetworkTime();
    return now + performanceTimeOffset;
}

/** returns the difference between server time and browser time in ms */
export const currentServerTimeOffset: () => number | null = () => {
    _checkNetworkTime();
    return serverTimeOffset;
}

const _checkNetworkTime = () => {
    if (serverTimeOffset != null || serverTimeCheckTimerId != null) return;
    serverTimeCheckTimerId = setInterval(async () => {
        try {
            await _updateNetworkTime()
            clearInterval(serverTimeCheckTimerId!);
        } catch (e) {
            console.error("Failed getting server time: ", e);
        }
    }, 3000);
}

const _updateNetworkTime = async () => {
    if (!globalThis.window || !window.fetch) return;
    const unixMs = await fetch(window.location.href, { method: 'HEAD' }).then(response => {
        const date = response.headers.get('date');
        return date ? new Date(date).getTime() : null;
    });
    if (unixMs == null) throw new Error("Date header not found.");
    serverTimeOffset = unixMs - Date.now();
    if (window.performance == undefined) return;
    performanceTimeOffset = (unixMs - performance.now());
}
