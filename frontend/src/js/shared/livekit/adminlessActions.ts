import { log, logDebug, logInfo, logWarn, logError } from "../logging"
import type { AuthTokenInfo as ATI } from "./adminActions";
export type AuthTokenInfo = ATI;

type LivekitRawRoomSDKResponse = {
    rooms?: {
        sid: string,
        name: string,
        empty_timeout: number,
        max_participants: number,
        creation_time: number,
        turn_password: string,
        enabled_codecs: { 'mime': string, 'fmtp_line': string }[],
        metadata: string,
        num_participants: number,
        num_publishers: number,
        active_recording: false
    }[]
}

// --- FUNCTIONS THAT DON'T USE THE OFFICAL LIVEKIT SDK: ---
// These functions are used with an existing signed livekit auth token,
// so the api key and secret key are not needed.

export async function listLivekitRoomsWithoutSDK(hostUrl: string, livekitToken: string) {
    return await fetch(hostUrl + '/twirp/livekit.RoomService/ListRooms', {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        body: '{}',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + livekitToken,
        }
    }).then(response => response.json()).then((response: LivekitRawRoomSDKResponse) => {
        const rooms = response.rooms;
        if (!Array.isArray(rooms)) throw new Error(`Error getting livekit room list from ${hostUrl} - ${JSON.stringify(response)}`)
        return rooms.filter(room => room.num_participants > 0)
    }).catch((e) => {
        throw new Error(`Error getting livekit room list from  - ${hostUrl}: ${e}`)
    });
}

// ROV-Specific parsing of our livekit room metadata JSON format:
export function getAuthTokenFromLivekitRoomMetadata(roomMetadata: string, tokensName: string = "accessTokens"): AuthTokenInfo | null {
    try {
        const metadata = JSON.parse(roomMetadata);
        const tokens = metadata["accessTokens"];
        if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
            logWarn("Failed to get tokens list from livekit room metadata");
            return null;
        } else {
            const token = tokens[Math.floor(Math.random() * 100000) % tokens.length];
            const tokenBits = token.split("|");
            if (tokenBits.length === 4) {
                const [givenIdentity, salt, iv, encryptedToken] = tokenBits;
                return { encrypted: true, salt: salt, iv: iv, token: encryptedToken, userGivenIdentity: givenIdentity };
            } else if (tokenBits.length === 2) {
                const tokenBits = token.split("|");
                const [givenIdentity, unencryptedToken] = tokenBits;
                return { encrypted: false, token: unencryptedToken, userGivenIdentity: givenIdentity };
            } else {
                log("Invalid auth token found in metadata: " + token);
                return null;
            }

        }
    } catch (e) {
        logWarn("Error parsing livekit room metadata: " + roomMetadata, e);
        return null;
    }
}
