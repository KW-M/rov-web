import { rov_actions_proto } from "./protobufs/rovActionsProto";

const logsToSend: { logLevel: rov_actions_proto.LogLevel, args: any[] }[] = [];

export function sendQueuedLogs(sendLogsCallback: (logLevel: rov_actions_proto.LogLevel, args: any[]) => Promise<boolean>) {
    const logsToSendCopy = logsToSend.slice();
    Promise.allSettled(logsToSendCopy.map((log) => {
        return sendLogsCallback(log.logLevel, log.args);
    })).then((results) => {
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result && result.status == "fulfilled" && result.value == true) logsToSend.splice(i, 1);
        }
    })
}

export function patchConsoleLogs(sendLogsCallback: (logLevel: rov_actions_proto.LogLevel, args: any[]) => Promise<boolean>) {
    if (console._modified) return;
    console._modified = true;
    // monkey patch console.log/debug/warn/error/info to send logs to the frontend via livekit
    const { log, debug, warn, error, info } = console;

    console.log = (...args: any[]) => {
        log.apply(console, args);
        sendLogsCallback(rov_actions_proto.LogLevel.Debug, args).then((successful) => {
            // if (!successful) logsToSend.push({ logLevel: rov_actions_proto.LogLevel.Debug, args: args });
        })
    }

    console.debug = (...args: any[]) => {
        debug.apply(console, args);
        sendLogsCallback(rov_actions_proto.LogLevel.Debug, args).then((successful) => {
            // if (!successful) logsToSend.push({ logLevel: rov_actions_proto.LogLevel.Debug, args: args });
        })
    }

    console.warn = (...args: any[]) => {
        warn.apply(console, args);
        sendLogsCallback(rov_actions_proto.LogLevel.Warning, args).then((successful) => {
            // if (!successful) logsToSend.push({ logLevel: rov_actions_proto.LogLevel.Warning, args: args });
        })
    }

    console.error = (...args: any[]) => {
        error.apply(console, args);
        sendLogsCallback(rov_actions_proto.LogLevel.Error, args).then((successful) => {
            // if (!successful) logsToSend.push({ logLevel: rov_actions_proto.LogLevel.Error, args: args });
        })
    }

    console.info = (...args: any[]) => {
        info.apply(console, args);
        sendLogsCallback(rov_actions_proto.LogLevel.Info, args).then((successful) => {
            // if (!successful) logsToSend.push({ logLevel: rov_actions_proto.LogLevel.Info, args: args });
        })
    }

    // Only Chrome & Opera have an error attribute on the event.
    window.addEventListener("error", function (e) {
        const args = [e.error ? e.error : "", e.message, e.filename + ":" + e.lineno + ":" + e.colno];
        if (e.error) {
            sendLogsCallback(rov_actions_proto.LogLevel.Error, args).then((successful) => {
                if (!successful) logsToSend.push({ logLevel: rov_actions_proto.LogLevel.Error, args: args });
            });
        }
    });
}
