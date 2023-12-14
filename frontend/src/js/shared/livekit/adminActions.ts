
import { getFrontendAccessToken } from './livekitTokens';
import { getHumanReadableId, getUniqueNumber } from '../util';
import { RoomServiceClient, type Room, EgressInfo, EgressClient } from 'livekit-server-sdk';

export interface AuthTokenInfo {
    // the name/id we will have (according to livekit) if we use this token.
    userGivenIdentity: string,
    // the actual token string
    token: string,
    // whether or not this token is encrypted (not just JWT encoding but an additional pass of encryption w the rov password).
    encrypted: boolean,
    // if encrypted, the salt used for encryption algorithm
    salt?: string,
    // if encrypted, the iv used for encryption algorithm
    iv?: string,
}


export function newLivekitAdminSDKRoomServiceClient(host: string, apiKey: string, secretKey: string) {
    return new RoomServiceClient(host, apiKey, secretKey)
}

export function newLivekitAdminSDKEgressClient(host: string, apiKey: string, secretKey: string) {
    return new EgressClient(host, apiKey, secretKey)
}

export async function deleteLivekitRoom(client: RoomServiceClient, roomName: string) {
    try {
        return await client.deleteRoom(roomName)
    } catch (e) {
        console.warn("Failed to delete room: " + roomName, e)
    }
}

export async function createLivekitRoom(client: RoomServiceClient, roomName: string, metadata: string = "") {
    // await deleteLivekitRoom(client, roomName)
    return await client.createRoom({
        name: roomName,
        maxParticipants: 12,
        emptyTimeout: 30, // 30 seconds
        metadata: metadata
    })
}

export async function listLivekitRooms(client: RoomServiceClient): Promise<Room[]> {
    const rooms = await client.listRooms();
    return rooms.filter(room => room.numParticipants > 0)
}


export async function updateLivekitRoomMetadata(client: RoomServiceClient, roomName: string, metadata: string) {
    return await client.updateRoomMetadata(roomName, metadata)
}

export async function generateLivekitRoomTokens(APIKey: string, secretKey: string, rovRoomName, alreadyTakenNames: string[], encryptionPassword: string | null = null): Promise<string[]> {
    const num_tokens_to_generate = 10;
    const tokens: string[] = [];
    for (let i = 0; i < num_tokens_to_generate; i++) {
        let userName = getHumanReadableId(getUniqueNumber());
        while (alreadyTakenNames.includes(userName)) {
            userName = getHumanReadableId(getUniqueNumber());
        }
        alreadyTakenNames.push(userName);
        const frontendAccessToken = await getFrontendAccessToken(APIKey, secretKey, rovRoomName, userName, encryptionPassword);
        tokens.push(frontendAccessToken);
    }
    return tokens
}

export async function refreshMetadata(cloudRoomClient: RoomServiceClient, APIKey: string, secretKey: string, rovRoomName, alreadyTakenNames: string[], encryptionPassword: string | null = null) {
    await updateLivekitRoomMetadata(cloudRoomClient, rovRoomName, JSON.stringify({
        accessTokens: await generateLivekitRoomTokens(APIKey, secretKey, rovRoomName, alreadyTakenNames, encryptionPassword)
    }));
}
