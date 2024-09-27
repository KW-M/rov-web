import { internalConnManager } from "./internalConnManager"
import { iRovWebSocketRelay } from "./websocketRelay";
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { twitchStream } from "./twitchStream";
import { ENCODE_TXT, FRONTEND_HANDLED_MAVLINK_MESSAGE_TYPES } from "./shared/consts";
import { getLongTermStarterAccessToken, getLongTermTestRoomAccessToken } from "./shared/livekit/livekitTokens";
import { irovMavlinkInterface } from "./mavlinkWebsocket";
import { getCPUUsageTotal, getDiskUsagePercent, getMemoryUsagePercent, getSystemAllInfo, getTemperatureAverage } from "./blueosAPIs/systemInfo";
import { setMessageInterval } from "./shared/mavlink2RestMessages";
import { getWebsocketURL } from "./shared/util";
import { MAVLinkType } from "./shared/mavlink2rest-ts/messages/mavlink2rest-enum";
import { URL_PARAMS } from "./constsInternal";
import { LogOrigin, mainLogr } from "./shared/logging";
import { log, logDebug, logInfo, logWarn, logError } from "./shared/logging"
import { backendArdupilotMavlinkMsgRcvd } from "./msgHandler";

/// ------- DEBUGGING STUFF: -----------
// DISABLE VITE HOT MOUDLE RELOADING:
// @ts-ignore (Ignore TS error for this line)
if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot.invalidate())

mainLogr.defaultLogOrigin = LogOrigin.ROV;
if (URL_PARAMS.SEND_LOGS) mainLogr.sendLogsAllowed = true;
const showLogsBtn = document.getElementById("show_recent_logs_btn")
const logsDiv = document.getElementById("recent_logs")
if (showLogsBtn && logsDiv) showLogsBtn.addEventListener("click", () => mainLogr.printRecentLogs(logsDiv))

Object.assign(window, {
    "getLongTermStarterAccessToken": () => {
        getLongTermStarterAccessToken(URL_PARAMS.LIVEKIT_API_KEY, URL_PARAMS.LIVEKIT_SECRET_KEY).then((t) => {
            console.log(t); document.write(t)
        }).catch((e) => {
            console.error(e); document.write((e.message || "") + " " + e.toString())
        })
    },
    "getLongTermTestRoomAccessToken": () => {
        getLongTermTestRoomAccessToken(URL_PARAMS.LIVEKIT_API_KEY, URL_PARAMS.LIVEKIT_SECRET_KEY).then((t) => {
            console.log(t); document.write(t)
        }).catch((e) => {
            console.error(e); document.write((e.message || "") + " " + e.toString())
        })
    }
})


//// ------------------------------------

// Start Livekit using  Setup Options from URL Query Params
internalConnManager.start({
    RovName: URL_PARAMS.ROV_NAME,
    APIKey: URL_PARAMS.LIVEKIT_API_KEY,
    SecretKey: URL_PARAMS.LIVEKIT_SECRET_KEY,
    LivekitCloudURL: URL_PARAMS.LIVEKIT_CLOUD_ENDPOINT,
    LivekitLocalURL: URL_PARAMS.LIVEKIT_LOCAL_ENDPOINT,
}).then(() => {
    const statsDiv = document.getElementById("video_stats")
    // internalConnManager.subscribeToVideoStats((stats) => {
    //     if (statsDiv) statsDiv.innerText = JSON.stringify(stats, null, 2)
    // })
})

// Initialize Twitch Stream
if (URL_PARAMS.TWITCH_STREAM_KEY !== "None") {
    twitchStream.init(URL_PARAMS.TWITCH_STREAM_KEY, URL_PARAMS.ROV_NAME, URL_PARAMS.LIVEKIT_API_KEY, URL_PARAMS.LIVEKIT_SECRET_KEY)
}

// // Start Backend/Python Websocket Communication
if (URL_PARAMS.PYTHON_WEBSOCKET_PORT != 0) {
    iRovWebSocketRelay.start("ws://localhost:" + URL_PARAMS.PYTHON_WEBSOCKET_PORT, (msgBytes: Uint8Array | string) => {
        /*Callback to handle messages being received from the iROV python*/


        // Decode protobuf object from bytes
        if (msgBytes.length === 0) return;
        const msgProto = rov_actions_proto.RovResponse.decode(msgBytes as Uint8Array)

        // Extract metadata from protobuf object
        if (!msgProto.BackendMetadata) return logError("No BackendMetadata in message from iROV", msgProto.toJSON(), msgBytes);
        const targetUserIds = msgProto.BackendMetadata.TargetUserIds
        const transportMethod = msgProto.BackendMetadata.TransportMethod
        const isReliable = transportMethod == rov_actions_proto.DataTransportMethod.LivekitReliable

        // Send message on using livekit:
        internalConnManager.sendMessage(msgProto, isReliable, targetUserIds || [])
    });
} else {
    logInfo("No PYTHON_WEBSOCKET_PORT url parameter set, skipping python websocket!")
}


// Start Mavlink2Rest Websocket Communication with the blue os apis
if (URL_PARAMS.BLUEOS_APIS_ENDPOINT) {
    const filter = "(" + FRONTEND_HANDLED_MAVLINK_MESSAGE_TYPES.join(")|(") + ")" // regex filter for mavlink message types
    irovMavlinkInterface.start(getWebsocketURL(URL_PARAMS.BLUEOS_APIS_ENDPOINT) + ":6040/ws/mavlink?filter=" + filter, (msg) => {
        /*Callback to handle messages being received from the arduPilot via */

        if (!msg.header || !msg.message) return logError("Mavlink message missing header or message body", msg);
        backendArdupilotMavlinkMsgRcvd(msg)

        // Encode message to bytes and create protobuf object
        const msgBytes = ENCODE_TXT(JSON.stringify(msg))
        const msgProto = rov_actions_proto.RovResponse.create({
            Mavlink: { Message: msgBytes }
        })

        // Send message on using livekit:
        if (FRONTEND_HANDLED_MAVLINK_MESSAGE_TYPES.includes(msg.message.type as MAVLinkType)) {
            internalConnManager.sendMessage(msgProto, true, [])
        }
    }, () => {
        irovMavlinkInterface.sendMessage(setMessageInterval(0, 8000000))
    });


    setInterval(() => {
        getSystemAllInfo().then((info) => {
            const cpuTemp = getTemperatureAverage(info.temperature);
            const cpuUsage = getCPUUsageTotal(info.cpu);
            const memUsage = getMemoryUsagePercent(info.memory);
            const diskUsage = getDiskUsagePercent(info.disk);
            const warnings: string[] = cpuTemp.warnings.concat(cpuUsage.warnings, memUsage.warnings, diskUsage.warnings);
            if (URL_PARAMS.DEBUG_MODE) logDebug("/SysInfo cpuTemp", cpuTemp, "cpuUsage", cpuUsage, "memUsage", memUsage, "diskUsage", diskUsage, warnings)
            const msgProto = rov_actions_proto.RovResponse.create({
                SystemMonitor: {
                    CpuTemp: cpuTemp.value,
                    CpuUsage: cpuUsage.value,
                    MemoryUsage: memUsage.value,
                    DiskUsage: diskUsage.value,
                    Warnings: warnings
                }
            })
            internalConnManager.sendMessage(msgProto, true, [])
        })
    }, 5000)
} else {
    logInfo("No BLUEOS_APIS_ENDPOINT url parameter set, skipping mavlink & system info monitoring!")
}


window.addEventListener("beforeunload", () => {
    twitchStream.stopStream()
    internalConnManager.stop()
    iRovWebSocketRelay.close()
    irovMavlinkInterface.close()
})
