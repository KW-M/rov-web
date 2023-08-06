
import '../../../shared/js/nodeShimsBundle'
import type * as livekitServerSDKTypes from 'livekit-server-sdk';
import { getFrontendAccessToken } from './livekitTokens';
import { getHumanReadableId, getUniqueNumber } from '../util';
const RoomServiceClient = globalThis.livekitServerSDK.RoomServiceClient as typeof livekitServerSDKTypes.RoomServiceClient

export type LivekitSetupOptions = {
    RovName: string,
    RovControlPassword: string,
    LivekitSecretKey: string,
    LivekitAPIKey: string,
    TwitchStreamKey: string,
    EnableLivekitCloud: boolean,
    EnableLivekitLocal: boolean,
    PythonWebsocketPort: number,
    AuthTokenTimeout: number,
}

export async function deleteLivekitRoom(client: livekitServerSDKTypes.RoomServiceClient, roomName: string) {
    try {
        return await client.deleteRoom(roomName)
    } catch (e) {
        console.warn("Failed to delete room: " + roomName, e)
    }
}


export async function createLivekitRoom(client: livekitServerSDKTypes.RoomServiceClient, roomName: string, metadata: string = "") {
    // await deleteLivekitRoom(client, roomName)
    return await client.createRoom({
        name: roomName,
        maxParticipants: 12,
        emptyTimeout: 30, // 30 seconds
        metadata: metadata
    })
}

export async function listLivekitRooms(client: livekitServerSDKTypes.RoomServiceClient): Promise<livekitServerSDKTypes.Room[]> {
    const rooms = await client.listRooms();
    return rooms.filter(room => room.numParticipants > 0)
}


export async function updateLivekitRoomMetadata(client: livekitServerSDKTypes.RoomServiceClient, roomName: string, metadata: string) {
    return await client.updateRoomMetadata(roomName, metadata)
}

export async function generateLivekitRoomTokens(APIKey: string, secretKey: string, rovRoomName, alreadyTakenNames: string[]): Promise<string> {
    const num_tokens_to_generate = 40;
    const tokens = [];
    for (let i = 0; i < num_tokens_to_generate; i++) {
        let userName = getHumanReadableId(getUniqueNumber());
        while (alreadyTakenNames.includes(userName)) {
            userName = getHumanReadableId(getUniqueNumber());
        }
        alreadyTakenNames.push(userName);
        const frontendAccessToken = getFrontendAccessToken(APIKey, secretKey, rovRoomName, userName);
        tokens.push(frontendAccessToken);
    }
}

export async function refreshMetadata(cloudRoomClient: livekitServerSDKTypes.RoomServiceClient, APIKey: string, secretKey: string, rovRoomName, alreadyTakenNames: string[]) {
    await updateLivekitRoomMetadata(cloudRoomClient, rovRoomName, JSON.stringify({
        accessTokens: generateLivekitRoomTokens(APIKey, secretKey, rovRoomName, alreadyTakenNames)
    }));
}


export function newLivekitAdminSDKRoomServiceClient(host: string, apiKey: string, secretKey: string) {
    return new RoomServiceClient(host, apiKey, secretKey)
}

// --- FUNCTIONS THAT DON'T USE THE OFFICAL LIVEKIT SDK: ---

type LivekitRawRoomSDKResponse = {
    "rooms": {
        "sid": string,
        "name": string,
        "empty_timeout": number,
        "max_participants": number,
        "creation_time": number,
        "turn_password": string,
        "enabled_codecs": { 'mime': string, 'fmtp_line': string }[],
        "metadata": string,
        "num_participants": number,
        "num_publishers": number,
        "active_recording": false
    }[]
}
export async function listLivekitRoomsSansSDK(hostUrl: string, livekitToken: string) {
    return await fetch(hostUrl + '/twirp/livekit.RoomService/ListRooms', {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + livekitToken,
        }
    }).then(response => response.json()).then((response: LivekitRawRoomSDKResponse) => {
        const rooms = response.rooms;
        if (!rooms || !Array.isArray(rooms)) throw new Error(`Error getting livekit room list from ${hostUrl} - ${JSON.stringify(response)}`)
        return rooms.filter(room => room.num_participants > 0)
    }).catch((e) => {
        throw new Error(`Error getting livekit room list from  - ${hostUrl}: ${e}`)
    });
}

export function getAuthTokenFromLivekitRoomMetadata(roomMetadata: string, tokensName: string = "accessTokens"): string {
    try {
        const metadata = JSON.parse(roomMetadata);
        const tokens = metadata[tokensName];
        if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
            console.warn("Failed to get tokens list from livekit room metadata");
            return "";
        } else return tokens[Date.now() % tokens.length];
    } catch (e) {
        console.log("Error parsing livekit room metadata", e, roomMetadata);
        return "";
    }
}
