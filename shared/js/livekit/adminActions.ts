
import '../../../shared/js/nodeShimsBundle'
import type * as livekitServerSDKTypes from 'livekit-server-sdk';
import { getFrontendAccessToken } from './livekitTokens';
const RoomServiceClient = globalThis.livekitServerSDK.RoomServiceClient as typeof livekitServerSDKTypes.RoomServiceClient

export type LivekitSetupOptions = {

    RovRoomName: string,
    CloudSecretKey: string,
    CloudAPIKey: string,
    LocalSecretKey: string,
    LocalAPIKey: string,
    EnableLivekitCloud: boolean,
    EnableLivekitLocal: boolean,
}

export async function createLivekitRoom(client: livekitServerSDKTypes.RoomServiceClient, roomName: string) {
    return await client.createRoom({
        name: roomName,
        maxParticipants: 12,
        emptyTimeout: 30, // 30 seconds
    })
}

export async function updateLivekitRoomMetadata(client: livekitServerSDKTypes.RoomServiceClient, roomName: string, metadata: string) {
    return await client.updateRoomMetadata(roomName, metadata)
}

export async function listLivekitRooms(client: livekitServerSDKTypes.RoomServiceClient): Promise<livekitServerSDKTypes.Room[]> {
    const rooms = await client.listRooms();
    return rooms.filter(room => room.numParticipants > 0)
}

export async function refreshMetadata(cloudRoomClient: livekitServerSDKTypes.RoomServiceClient, livekitSetup: LivekitSetupOptions) {
    const frontendAccessToken = getFrontendAccessToken(livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey, livekitSetup.RovRoomName, "PERSON" + Date.now().toString());
    await updateLivekitRoomMetadata(cloudRoomClient, livekitSetup.RovRoomName, JSON.stringify({
        accessToken: frontendAccessToken,
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

export function parseLivekitRoomMetadata(roomMetadata: string, tokenName: string = "accessToken"): string {
    try {
        const metadata = JSON.parse(roomMetadata);
        return metadata[tokenName];
    } catch (e) {
        console.log("Error parsing livekit room metadata", e);
        return "";
    }
}
