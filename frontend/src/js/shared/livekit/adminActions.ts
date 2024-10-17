
import { encryptAccessToken, getFrontendAccessToken, silenceFalseSecurityNotice } from './livekitTokens';
import { getHumanReadableId, getUniqueNumber, waitfor } from '../util';
import { RoomServiceClient, type Room, EgressClient } from 'livekit-server-sdk';
import { log, logDebug, logInfo, logWarn, logError } from "../logging"
import { unixTimeNow } from '../time';

export interface AuthTokenInfo {
    // the name/id we will have (according to livekit) if we use this token.
    userGivenIdentity: string,
    // the actual token string
    token: string,
    // whether or not this token is encrypted (not just JWT encoding but an additional pass of encryption with the rov password).
    encrypted: boolean,
    // if encrypted, the salt used for encryption algorithm
    salt?: string,
    // if encrypted, the iv used for encryption algorithm
    iv?: string,
}

const LIVEKIT_API_MIN_DELAY = 1000;
let lastLivekitApiCallTime = 0;


export class livekitRoomTokenApis {
    client: RoomServiceClient

    constructor(host: string, authToken: string) {
        this.client = new RoomServiceClient(host)
        Object.assign(this.client, {
            authToken: authToken,
            authHeader: async (_: any) => {
                return {
                    Authorization: `Bearer ${authToken}`,
                };
            }
        })
    }

    listLivekitRooms() {
        return this.client.listRooms()
    }
}

export class LivekitRoomAdmin {
    client: RoomServiceClient
    egressClient: EgressClient

    roomName: string
    tokenEncryptionPassword: string | null
    apiKey: string
    secretKey: string

    constructor(apiKey: string, secretKey: string, host: string, roomName: string, tokenEncryptionPassword: string | null = null) {
        this.apiKey = apiKey
        this.secretKey = secretKey
        this.roomName = roomName
        this.tokenEncryptionPassword = tokenEncryptionPassword
        this.client = new RoomServiceClient(host, apiKey, secretKey)
        this.egressClient = new EgressClient(host, apiKey, secretKey)
    }

    getEgressClient() {
        return this.egressClient
    }

    async waitForRateLimit() {
        while ((unixTimeNow() - lastLivekitApiCallTime) < LIVEKIT_API_MIN_DELAY) {
            console.log("Waiting for rate limit...", unixTimeNow() - lastLivekitApiCallTime);
            await waitfor(LIVEKIT_API_MIN_DELAY);
        }
        lastLivekitApiCallTime = unixTimeNow();
    }

    async deleteLivekitRoom() {
        // don't rate limit as this must run quickly when called on page unload
        try {
            return await this.client.deleteRoom(this.roomName)
        } catch (e) {
            logWarn("LK Admin: Failed to delete room: " + this.roomName, e)
        }
    }

    async createLivekitRoom(alreadyTakenNames: string[], numParticipants: number) {
        const metadata = await this._generateRoomMetadata(alreadyTakenNames, numParticipants);
        await this.waitForRateLimit();
        const roomCreated = await silenceFalseSecurityNotice(() => this.client.createRoom({
            name: this.roomName,
            maxParticipants: 8,
            metadata: metadata,
            syncStreams: false,
            emptyTimeout: 60, // 60 seconds
            departureTimeout: 30, // 30 seconds
        }));
        logInfo("LK Admin: Created room: " + this.roomName, roomCreated);
        return roomCreated;
    }

    async listLivekitRooms(): Promise<Room[]> {
        await this.waitForRateLimit();
        const rooms = await silenceFalseSecurityNotice(() => this.client.listRooms());
        return rooms.filter(room => room.numParticipants > 0);
    }

    async updateRoomMetadata(alreadyTakenNames: string[], numParticipants: number) {
        const metadata = await this._generateRoomMetadata(alreadyTakenNames, numParticipants);
        await this.waitForRateLimit();
        try {
            return await silenceFalseSecurityNotice(() => this.client.updateRoomMetadata(this.roomName, metadata))
        } catch (e) {
            throw new Error("LK Admin: Failed to update metadata for room " + this.roomName + e.toString())
        }
    }

    private async _generateRoomMetadata(alreadyTakenNames: string[], numParticipants: number): Promise<string> {
        const NUM_TOKENS_TO_GENERATE = 3;
        let accessTokens: AuthTokenInfo[] = [], userName;
        for (let i = 0; i < NUM_TOKENS_TO_GENERATE; i++) {
            do {
                userName = getHumanReadableId(getUniqueNumber());
            } while (alreadyTakenNames.includes(userName))
            alreadyTakenNames.push(userName);

            // generate an auth token for this user and add it to the list
            const token = await getFrontendAccessToken(this.apiKey, this.secretKey, this.roomName, userName);
            if (this.tokenEncryptionPassword) {
                const encryptedToken = await encryptAccessToken(token, this.tokenEncryptionPassword);
                accessTokens.push({
                    userGivenIdentity: userName,
                    encrypted: true,
                    ...encryptedToken,
                });
            } else {
                accessTokens.push({
                    userGivenIdentity: userName,
                    token,
                    encrypted: false,
                });
            }

        }
        const metadata = JSON.stringify({
            numParticipants,
            accessTokens
        });
        return metadata;
    }

}
