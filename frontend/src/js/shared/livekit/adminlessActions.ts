import { takenLivekitUsernameIds } from "../../globalContext";
import { log, logDebug, logInfo, logWarn, logError } from "../logging"
import { livekitRoomTokenApis, type AuthTokenInfo as ATI } from "./adminActions";
import { isTokenValid } from "./livekitTokens";
export type AuthTokenInfo = ATI;

export async function listLivekitRoomsWithoutSDK(hostUrl: string, livekitToken: string) {
    const api = new livekitRoomTokenApis(hostUrl, livekitToken)
    const rooms = await api.listLivekitRooms()
    return rooms.filter(room => room.numParticipants > 0)
}

// ROV-Specific parsing of our livekit room metadata JSON format:
export function getAuthTokenFromLivekitRoomMetadata(roomMetadata: string, numRoomParticipants: number): AuthTokenInfo | null {
    try {
        const metadata = JSON.parse(roomMetadata);
        const tokens = metadata["accessTokens"] as AuthTokenInfo[];
        const numKnownParticipants = metadata["numParticipants"];
        if (!tokens || !Array.isArray(tokens) || tokens.length === 0 || numRoomParticipants > numKnownParticipants) {
            logWarn("Failed to get tokens list from livekit room metadata", "numRoomParticipants", numRoomParticipants, "numRovKnownParticipants", numKnownParticipants, metadata);
            return null;
        } else {
            let j = Math.floor(Math.random() * 100001) % tokens.length
            for (let i = 0; i < tokens.length; i++) {
                // return a random auth token from the list
                let tokenInfo = tokens[(i + j) % tokens.length];
                if (!tokenInfo) continue;
                if (!tokenInfo.userGivenIdentity) continue;
                if (takenLivekitUsernameIds.get().has(tokenInfo.userGivenIdentity)) continue;
                if (!tokenInfo.encrypted && !isTokenValid(tokenInfo.token)) continue;
                return tokenInfo;
            }
            return null;
        }
    } catch (e) {
        logWarn("Error parsing livekit room metadata: " + roomMetadata, e);
        return null;
    }
}




// --- FUNCTIONS THAT DON'T USE THE OFFICAL LIVEKIT SERVER SDK:  ---
// NO LONGER USED, BUT KEPT FOR REFERENCE
// These functions are used with an existing signed livekit auth token,
// so the api key and secret key are not needed, but we also can't use the main lib.

// type LivekitRawRoomSDKResponse = {
//     rooms?: {
//         sid: string,
//         name: string,
//         empty_timeout: number,
//         max_participants: number,
//         creation_time: number,
//         turn_password: string,
//         enabled_codecs: { 'mime': string, 'fmtp_line': string }[],
//         metadata: string,
//         num_participants: number,
//         num_publishers: number,
//         active_recording: false
//     }[]
// }

// export async function listLivekitRoomsWithoutSDK(hostUrl: string, livekitToken: string) {
// return await fetch(hostUrl + '/twirp/livekit.RoomService/ListRooms', {
//     method: 'POST',
//     cache: 'no-cache',
//     mode: 'cors',
//     body: '{}',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + livekitToken,
//     }
// }).then(response => response.json()).then((response: LivekitRawRoomSDKResponse) => {
//     const rooms = response.rooms;
//     if (!Array.isArray(rooms)) throw new Error(`Error getting livekit room list from ${hostUrl} - ${JSON.stringify(response)}`)
//     return rooms.filter(room => room.num_participants > 0)
// }).catch((e) => {
//     throw new Error(`Error getting livekit room list from  - ${hostUrl}: ${e}`)
// });
// }
