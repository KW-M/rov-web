
import { getFrontendAccessToken, silenceFalseSecurityNotice } from './livekitTokens';
import { getHumanReadableId, getUniqueNumber, waitfor } from '../util';
import { RoomServiceClient, type Room, EgressInfo, EgressClient } from 'livekit-server-sdk';
import { log, logDebug, logInfo, logWarn, logError } from "../logging"

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

const LIVEKIT_API_MIN_DELAY = 1000;
let lastLivekitApiCallTime = 0;

export async function waitForRateLimit() {
    while ((Date.now() - lastLivekitApiCallTime) < LIVEKIT_API_MIN_DELAY) {
        console.log("Waiting for rate limit...", Date.now() - lastLivekitApiCallTime);
        await waitfor(LIVEKIT_API_MIN_DELAY);
    }
    lastLivekitApiCallTime = Date.now();
}


export function newLivekitAdminSDKRoomServiceClient(host: string, apiKey: string, secretKey: string) {
    return new RoomServiceClient(host, apiKey, secretKey)
}

export function newLivekitAdminSDKEgressClient(host: string, apiKey: string, secretKey: string) {
    return new EgressClient(host, apiKey, secretKey)
}

export async function deleteLivekitRoom(client: RoomServiceClient, roomName: string) {
    await waitForRateLimit();
    try {
        return await client.deleteRoom(roomName)
    } catch (e) {
        logWarn("Failed to delete room: " + roomName, e)
    }
}

export async function createLivekitRoom(client: RoomServiceClient, roomName: string, apiKey: string, secretKey: string, alreadyTakenNames: string[], encryptionPassword: string | null = null) {
    const metadata = await generateLivekitRoomMetadata(roomName, apiKey, secretKey, alreadyTakenNames, encryptionPassword)
    await waitForRateLimit();
    const roomCreated = await silenceFalseSecurityNotice(() => client.createRoom({
        name: roomName,
        maxParticipants: 8,
        metadata: metadata,
        syncStreams: false,
        emptyTimeout: 60, // 60 seconds
        departureTimeout: 30, // 30 seconds
    }))
    logInfo("LK: Created room: " + roomName, roomCreated)
    return roomCreated
}

export async function listLivekitRooms(client: RoomServiceClient): Promise<Room[]> {
    await waitForRateLimit();
    const rooms = await client.listRooms();
    return rooms.filter(room => room.numParticipants > 0)
}


export async function updateLivekitRoomMetadata(client: RoomServiceClient, roomName: string, metadata: string) {
    await waitForRateLimit();
    try {
        return await silenceFalseSecurityNotice(() => client.updateRoomMetadata(roomName, metadata))
    } catch (e) {
        throw new Error("LK: Failed to update metadata for room " + roomName + e.toString())
    }
}

export async function generateLivekitRoomMetadata(rovRoomName: string, APIKey: string, secretKey: string, alreadyTakenNames: string[], encryptionPassword: string | null = null): Promise<string> {
    const NUM_TOKENS_TO_GENERATE = 3;
    let tokens: string[] = [], userName;
    for (let i = 0; i < NUM_TOKENS_TO_GENERATE; i++) {
        do {
            userName = getHumanReadableId(getUniqueNumber());
        } while (alreadyTakenNames.includes(userName))
        alreadyTakenNames.push(userName);
        const frontendAccessToken = await getFrontendAccessToken(APIKey, secretKey, rovRoomName, userName, encryptionPassword);
        tokens.push(frontendAccessToken);
    }
    const metadata = JSON.stringify({
        accessTokens: tokens
    });
    return metadata;
}
