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
    timestamp: number, // performance.now()
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
    sendLogsCallback: (logLevel: LogLevel, args: any[]) => Promise<boolean>;
    rootURL: string;
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
    }

    subscribe(subscriber: () => void) {
        this.svelteSubscribers.push(subscriber);
        subscriber();
    }

    enableSendLogs(sendLogsCallback: (logLevel: LogLevel, args: any[]) => Promise<boolean>) {
        this.sendLogsCallback = sendLogsCallback;

        // Only Chrome & Opera have an error attribute on the event.
        window.addEventListener("error", (e) => {
            const args = [e.error ? e.error : "", e.message, e.filename + ":" + e.lineno + ":" + e.colno];
            if (e.error) {
                sendLogsCallback(LogLevelConsole.Error, args).then((successful) => {
                    if (!successful) this.addLog(LogLevelConsole.Error, args);
                });
            }
        });

        this.sendLogsInterval = setInterval(() => {
            this.sendQueuedLogs(sendLogsCallback);
        }, 1000) as any as number;
    }

    sendQueuedLogs(sendLogsCallback: (logLevel: LogLevelConsole, args: any[], trace: string[]) => Promise<boolean>) {
        const logsToSendCopy = this.logsStore.filter((log) => !log.sentToRemote);
        logsToSendCopy.forEach((log) => { log.sentToRemote = true });
        Promise.allSettled(logsToSendCopy.map((log) => {
            return sendLogsCallback(log.level, log.args, log.trace)
        })).then((results) => {
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result && result.status == "fulfilled" && result.value == true) {
                    this.logsStore[i].sentToRemote = true;
                } else {
                    this.logsStore[i].sentToRemote = false;
                    console.log("Failed to send log result", result);
                }
            }
        })
    }

    addLog(
        logLevel: LogLevelConsole,
        args: any[],
        trace: string[] = [],
        kind: LogKind = LogKind.CONSOLE,
        origin: LogOrigin = this.defaultLogOrigin,
        timestamp: number = performance.now(),
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

    printRecentLogs(n: number = 100) {
        console.clear();
        console.groupCollapsed("Recent Logs");
        const min = Math.max(this.logsStore.length - n, 0);
        for (let i = this.logsStore.length - 1; i > min; i--) {
            const log = this.logsStore[i];
            this.printLog(log);
        }
        console.groupEnd();
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
