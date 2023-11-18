import { internalConnManager } from "./internalConnManager"
// import { iRovWebSocketRelay } from "./websocketRelay";
// import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import type { LivekitSetupOptions } from "./shared/livekit/adminActions";
// import { twitchStream } from "./twitchStream";
import { ENCODE_TXT, SECONDS_IN_DAY } from "./shared/consts";
import { getLongTermStarterAccessToken } from "./shared/livekit/livekitTokens";
// import { irovMavlinkInterface } from "./mavlinkWebsocket";
// import { getCPUUsageTotal, getDiskUsagePercent, getMemoryUsagePercent, getNetworkUsagePercent, getSystemAllInfo, getTemperatureAverage } from "./blueosAPIs/systemInfo";

/// ------- DEBUGGING STUFF: -----------
window["getLongTermStarterAccessToken"] = getLongTermStarterAccessToken
// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot) {
    import.meta.hot.accept(() => import.meta.hot.invalidate())
}
//// ------------------------------------

// Get Setup Options from URL Query Params
const urlParams = new URLSearchParams(location.search);
const livekitConfig: LivekitSetupOptions = {
    RovName: urlParams.get("RovName"),
    RovControlPassword: urlParams.get("RovControlPassword"),
    LivekitAPIKey: urlParams.get("LivekitApiKey"),
    LivekitSecretKey: urlParams.get("LivekitSecretKey"),
    TwitchStreamKey: urlParams.get("TwitchStreamKey") || "None", // Twitch Stream Key (For Streaming, duh)
    EnableLivekitLocal: (urlParams.get("ForceLocal") || "false").toLowerCase() === 'true',
    EnableLivekitCloud: (urlParams.get("EnableCloud") || "true").toLowerCase() === 'true',
    PythonWebsocketPort: parseInt(urlParams.get("PythonWebsocketPort")) || 0,
    AuthTokenTimeout: parseInt(urlParams.get("AuthTokenTimeout")) || SECONDS_IN_DAY,
}
for (const key in livekitConfig) if (livekitConfig[key] == undefined) throw new Error("Missing required url query parameter: " + key);

// Start Livekit
internalConnManager.start(livekitConfig)

// // Initialize Twitch Stream
// if (livekitConfig.TwitchStreamKey !== "None") {
//     twitchStream.init(livekitConfig.TwitchStreamKey, livekitConfig.RovName, livekitConfig.LivekitAPIKey, livekitConfig.LivekitSecretKey)
//     window.addEventListener("beforeunload", () => twitchStream.stopStream()) // Stop Twitch Stream when page is closed
// }

// // Start Backend/Python Websocket Communication
// if (livekitConfig.PythonWebsocketPort != 0) iRovWebSocketRelay.start("ws://localhost:" + livekitConfig.PythonWebsocketPort, (msgBytes: Uint8Array) => {
//     /*Callback to handle messages being received from the iROV python*/


//     // Decode protobuf object from bytes
//     if (msgBytes.length === 0) return;
//     const msgProto = rov_actions_proto.RovResponse.decode(msgBytes)

//     // Extract metadata from protobuf object
//     if (!msgProto.BackendMetadata) return console.error("No BackendMetadata in message from iROV", msgProto.toJSON(), msgBytes);
//     const targetUserIds = msgProto.BackendMetadata.TargetUserIds
//     const transportMethod = msgProto.BackendMetadata.TransportMethod
//     const isReliable = transportMethod == rov_actions_proto.DataTransportMethod.LivekitReliable

//     // Send message on using livekit:
//     internalConnManager.sendMessage(msgProto, isReliable, targetUserIds)
// });


// // Start Mavlink2Rest Websocket Communication
// irovMavlinkInterface.start("ws://blueos.attlocal.net:6040/ws/mavlink", (msg) => {
//     /*Callback to handle messages being received from the arduPilot via */

//     if (!msg.header || !msg.message) return console.error("Mavlink message missing header or message body", msg);
//     const msgBytes = ENCODE_TXT(JSON.stringify(msg))
//     const msgProto = rov_actions_proto.RovResponse.create({
//         Mavlink: {
//             Message: msgBytes,
//         }
//     })

//     // Send message on using livekit:
//     internalConnManager.sendMessage(msgProto, true, [])
// });


// setInterval(() => {
//     getSystemAllInfo().then((info) => {
//         const cpuTemp = getTemperatureAverage(info.temperature);
//         const cpuUsage = getCPUUsageTotal(info.cpu);
//         const memUsage = getMemoryUsagePercent(info.memory);
//         const diskUsage = getDiskUsagePercent(info.disk);
//         const warnings: string[] = cpuTemp.warnings.concat(cpuUsage.warnings, memUsage.warnings, diskUsage.warnings);
//         console.log("/SysInfo cpuTemp", cpuTemp, "cpuUsage", cpuUsage, "memUsage", memUsage, "diskUsage", diskUsage, warnings)
//         const msgProto = rov_actions_proto.RovResponse.create({
//             SystemMonitor: {
//                 CpuTemp: cpuTemp.value,
//                 CpuUsage: cpuUsage.value,
//                 MemoryUsage: memUsage.value,
//                 DiskUsage: diskUsage.value,
//                 Warnings: warnings
//             }
//         })
//         internalConnManager.sendMessage(msgProto, true, [])
//     })
// }, 5000)
