import { rov_actions_proto } from "./protobufs/rovActionsProto";

const VITEBUILD_EXTRANIOUS_PATH = "/@fs/Users/ky/Documents/Github/rov-web";

export enum LogLevelConsole {
    Info = rov_actions_proto.LogLevel.Info,
    Warn = rov_actions_proto.LogLevel.Warning,
    Error = rov_actions_proto.LogLevel.Error,
    Debug = rov_actions_proto.LogLevel.Debug,
    Console = 4,
}

export enum LogKind {
    CONSOLE,
    SP_WebRTC,
    LK_WebRTC,
    MAVLINK,
    BLUEOS,
}

export enum LogOrigin {
    ROV,
    PILOT,
}

export type LogLevel = rov_actions_proto.LogLevel | LogLevelConsole;

export interface LogEntry {
    timestamp: number, // Date.now()
    level: LogLevelConsole, // warning, error, info, debug, console
    args: any[],
    trace: string[],
    origin: LogOrigin,
    kind: LogKind,
    sentToRemote: boolean
}

interface partialConsole {
    info: Console["info"];
    log: Console["log"];
    warn: Console["warn"];
    error: Console["error"];
    debug: Console["debug"];
    _modified?: boolean;
}

export class Logger {

    logsStore: LogEntry[] = [];
    rootURL: string;
    sendLogsAllowed: boolean = false;
    sendLogsInterval: number;
    rawConsole: partialConsole;
    defaultLogOrigin: LogOrigin;
    svelteSubscribers: (() => void)[] = [];

    constructor(origin: LogOrigin = LogOrigin.PILOT) {
        const { log, debug, warn, error, info } = console;
        this.rawConsole = { log, debug, warn, error, info };
        this.rootURL = window.location.protocol + "//" + window.location.host;
        this.defaultLogOrigin = origin;
        console.log("Logger initialized", this.rootURL)

        // Only Chrome & Opera have an error attribute on the event.
        window.addEventListener("error", (e: ErrorEvent) => {
            if (!e) return;
            const args = [e.error ? e.error : "", e.message, e.filename + ":" + e.lineno + ":" + e.colno];
            this.addLog(LogLevelConsole.Error, args, [], LogKind.CONSOLE, this.defaultLogOrigin);
        });
    }

    subscribe(subscriber: () => void) {
        this.svelteSubscribers.push(subscriber);
        subscriber();
    }

    sendQueuedLogs(sendLogsCallback: (logLevel: LogLevelConsole, msg: string, logid?: string) => Promise<boolean>) {
        if (!this.sendLogsAllowed) return;
        const logsToSendCopy = this.logsStore.filter((log) => !log.sentToRemote);
        logsToSendCopy.forEach((log) => { log.sentToRemote = true });
        // if (logsToSendCopy.length === 0) return clearInterval(this.sendLogsInterval);
        return Promise.allSettled(logsToSendCopy.map((log, i) => {
            const json = mainLogr.logToJson(log);
            return sendLogsCallback(log.level, json, log.timestamp.toString() + "_" + log.origin.toString() + "_" + i.toString());
        })).then((results) => {
            const failedToSendLogs: { log: LogEntry, result: any }[] = []
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result && result.status == "fulfilled" && result.value == true) {
                    this.logsStore[i].sentToRemote = true;
                } else {
                    this.logsStore[i].sentToRemote = false;
                    failedToSendLogs.push({ log: this.logsStore[i], result });
                }

            }
            if (failedToSendLogs.length > 0) console.warn("Failed to send some logs.", failedToSendLogs);
            return failedToSendLogs.length;
        })
    }

    addLog(
        logLevel: LogLevelConsole,
        args: any[],
        trace: string[] = [],
        kind: LogKind = LogKind.CONSOLE,
        origin: LogOrigin = this.defaultLogOrigin,
        timestamp: number = Date.now(),
        sentToRemote: boolean = false
    ) {
        if (!trace) {
            const stack = new Error().stack
            trace = stack ? stack.split("\n").slice(3).map((s) => s.replace(this.rootURL, "").replace(VITEBUILD_EXTRANIOUS_PATH, "").trim().slice(3)) : [];
        }
        let i = this.logsStore.length;
        while (i > 0 && this.logsStore[i - 1].timestamp > timestamp) i--;
        const log: LogEntry = { timestamp, level: logLevel, args, trace, sentToRemote, kind, origin };
        this.logsStore.splice(i, 0, log);
        this.svelteSubscribers.forEach((subscriber) => subscriber());
        // this.logsStore.sort((a, b) => a.timestamp - b.timestamp);
    }

    logAddLevelFlair(log: LogEntry) {
        const args = log.args;
        if (typeof (args[0]) !== typeof ("")) args.unshift("****")
        else args[0] = "**** " + args[0];
        // if (log.trace && log.trace.length > 0) args.push(log.trace.join("\n"));
        return {
            ...log,
            args
        }
    }

    printLog(log: LogEntry) {
        if (log.trace && log.trace.length > 0) {
            const msg = log.args[0];
            const args = log.args.slice(1);
            args.push(log.trace.join("\n"));
            console.groupCollapsed("%c" + msg, this._getLevelColor(log.level));
            this._consoleLogAtLevel(log.level, args);
            console.groupEnd();
        } else {
            if (typeof (log.args[0]) !== typeof ("")) log.args.unshift("****")
            log.args[0] = "%c " + log.args[0];
            log.args.splice(1, 0, this._getLevelColor(log.level));
            this._consoleLogAtLevel(log.level, log.args);
        }
    }

    consoleRecentLogs(n: number = 100) {
        console.clear();
        console.groupCollapsed("Recent Logs");
        const min = Math.max(this.logsStore.length - n, 0);
        for (let i = this.logsStore.length - 1; i > min; i--) {
            const log = this.logsStore[i];
            this.printLog(log);
        }
        console.groupEnd();
    }

    printRecentLogs(element: HTMLElement, n: number = 1000) {
        element.innerHTML = "";
        const min = Math.max(this.logsStore.length - n, 0);
        for (let i = this.logsStore.length - 1; i > min; i--) {
            const log = this.logsStore[i];
            const [header, body] = this.logToText(log);
            const div = document.createElement("div");
            div.innerHTML = `<details style="font-size: 1.1em; font-weight: bold; padding: 0.2em; ${this._getLevelColor(log.level)}"><summary><small>${log.timestamp} </small> <span>${header}</span></summary><pre>${body}</pre></details>`;
            element.appendChild(div);
        }
    }


    _makeJsonEncodable(thing: any, level: number = 0) {
        if (level > 9) return "Max recursion level reached";
        const type = typeof thing;
        if (type === "string" || type === "number" || type === "boolean") {
            return thing;
        } else if (thing === undefined) {
            return "undefined";
        } else if (thing === null) {
            return null;
        } else if (thing instanceof Error) {
            return { instanceOf: type, name: thing.name, errMessage: thing.message, stack: thing.stack, cause: thing.cause };
        } else if (thing instanceof Date) {
            return thing.toISOString();
        } else if (thing instanceof Map) {
            const obj: { [key: string]: any } = {};
            thing.forEach((value, key) => {
                obj[key] = this._makeJsonEncodable(value, level + 1);
            });
            return { instanceof: type, value: obj };
        } else if (thing instanceof Set) {
            let arr = Array.from(thing).map((item) => this._makeJsonEncodable(item, level + 1));
            return { instanceof: type, value: arr };
        } else if (thing instanceof Array || thing instanceof Uint8Array || thing instanceof Int8Array || thing instanceof Uint16Array || thing instanceof Int16Array || thing instanceof Uint32Array || thing instanceof Int32Array || thing instanceof Float32Array || thing instanceof Float64Array) {
            return thing.map((item) => this._makeJsonEncodable(item, level + 1));
        } else if (thing instanceof Object) {
            const obj: { [key: string]: any } = {};
            for (const key in thing) {
                if (!thing.hasOwnProperty(key)) continue;
                obj[key] = this._makeJsonEncodable(thing[key], level + 1);
            }
            return obj;
        } else {
            try {
                return thing.toString();
            } catch (e) {
                return { instanceof: type, value: "Failed to stringify: " + e.message };
            }
        }
    }

    logToJson(log: LogEntry) {
        const { timestamp, args, trace, origin, kind, level } = log;
        return JSON.stringify(this._makeJsonEncodable({
            level, timestamp, args, trace, origin, kind
        }));
    }


    logToText(log: LogEntry) {
        let header = "";
        let body = "";
        let i = 0;

        for (; i < log.args.length; i++) {
            const arg = log.args[i];
            try {
                if (arg === null) {
                    header += " null";
                } else if (arg === undefined) {
                    header += " undefined";
                } else if (arg instanceof Error) {
                    header += arg.name + " " + arg.message + " " + arg.cause;
                    body += arg.stack;
                } else if (arg instanceof Object) {
                    body += "\n" + JSON.stringify(arg, null, 2) + "\n";
                    break;
                } else {
                    header += " " + arg.toString();
                }
            } catch (e) {
                body += " STRINGFAIL:" + typeof arg + " ";
                console.error("Failed to stringify logs arg: " + e.message, typeof arg, arg);
            }
        }
        for (; i < log.args.length; i++) {
            const arg = log.args[i];
            try {
                if (arg === null) {
                    body += " null";
                } else if (arg === undefined) {
                    body += " undefined";
                } else if (arg instanceof Error) {
                    body += arg.name + " " + arg.message + " " + arg.cause + "\n" + arg.stack;
                } else if (arg instanceof Object) {
                    body += "\n" + JSON.stringify(arg, null, 2) + "\n";
                } else {
                    body += " " + arg.toString();
                }
            } catch (e) {
                body += " STRINGFAIL:" + typeof arg + " ";
                console.error("Failed to stringify logs arg: " + e.message, typeof arg, arg);
            }
        }
        if (log.trace && log.trace.length > 0) {
            body += "\n" + log.trace.join("\n");
        }
        return [header, body];
    }


    // _logWithTrace() {
    //     const args = Array.prototype.slice.call(arguments);
    //     const trace = new Error().stack || "";
    //     const splitTrace = trace.split("\n").slice(0).map((s) => s.trim().slice(3));
    //     log.apply(console, args);
    // };

    _consoleLogAtLevel(level: LogLevel, args: any[], trace: string[] = []) {
        if (level === LogLevelConsole.Debug) {
            this.rawConsole.debug.apply(console, args);
        } else if (level === LogLevelConsole.Warn) {
            this.rawConsole.warn.apply(console, args);
        }
        else if (level === LogLevelConsole.Error) {
            this.rawConsole.error.apply(console, args);
        }
        else if (level === LogLevelConsole.Info) {
            this.rawConsole.info.apply(console, args);
        }
    }

    _getLevelColor(level: LogLevelConsole) {
        if (level === LogLevelConsole.Debug) {
            return "color: #008888";
        } else if (level === LogLevelConsole.Warn) {
            return "color: #888800";
        } else if (level === LogLevelConsole.Error) {
            return "color: #880000";
        } else if (level === LogLevelConsole.Info) {
            return "color: #000088";
        } else if (level === LogLevelConsole.Console) {
            return "color: #000000";
        }
    }

    _getLevelIcon(level: LogLevelConsole) {
        if (level === LogLevelConsole.Debug) {
            return "🐛";
        } else if (level === LogLevelConsole.Warn) {
            return "🟨";
        } else if (level === LogLevelConsole.Error) {
            return "🛑";
        } else if (level === LogLevelConsole.Info) {
            return "ℹ️";
        } else if (level === LogLevelConsole.Console) {
            return "ℹ️";
        }

    }

    getLogs() {
        return this.logsStore;
    }

    log(...args: any[]) {
        this.rawConsole.log.apply(console, args);
        this.addLog(LogLevelConsole.Console, args);
    }

    logDebug(...args: any[]) {
        this.rawConsole.debug.apply(console, args);
        this.addLog(LogLevelConsole.Debug, args);
    }

    logWarn(...args: any[]) {
        this.rawConsole.warn.apply(console, args);
        this.addLog(LogLevelConsole.Warn, args);
    }

    logError(...args: any[]) {
        this.rawConsole.error.apply(console, args);
        this.addLog(LogLevelConsole.Error, args);
    }

    logInfo(...args: any[]) {
        this.rawConsole.info.apply(console, args);
        this.addLog(LogLevelConsole.Info, args);
    }
}
export const mainLogr = new Logger();
export const logDebug = mainLogr.logDebug.bind(mainLogr);
export const logWarn = mainLogr.logWarn.bind(mainLogr);
export const logError = mainLogr.logError.bind(mainLogr);
export const logInfo = mainLogr.logInfo.bind(mainLogr);
export const log = mainLogr.log.bind(mainLogr);
