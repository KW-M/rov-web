
import { AccessToken } from "livekit-server-sdk";
import { DECODE_TXT, ENCODE_TXT, ENCRYPTED_AUTH_TOKEN_PREFIX } from "../consts";
import { encrypt } from "../encryption";
import { log, logDebug, logInfo, logWarn, logError } from "../logging"

/**
 * Get a livekit auth token that's valid for 24 hrs and allows all actions.
 * @param apiKey livekit api key to use
 * @param secretKey livekit api secret key to use
 * @param rovName the room name & user identity to use.
 * @returns {string} JWT access token
 */
export async function getPublisherAccessToken(apiKey: string, secretKey: string, rovName: string): Promise<string> {
    const token = new AccessToken(apiKey, secretKey, {
        identity: rovName,
        ttl: 86400, // (seconds in 24hrs),
    })
    token.addGrant({
        room: rovName,
        roomJoin: true,
        roomCreate: true,
        roomAdmin: true,
        roomList: true,
        canPublish: true,
        canSubscribe: false,
        canPublishData: true,
        canUpdateOwnMetadata: true,
    });
    return await token.toJwt();
}

export async function encryptAccessToken(accessToken: string, password: string): Promise<string> {
    const { encryptedText, iv, salt } = await encrypt(accessToken, password)
    return salt + "|" + iv + "|" + encryptedText;
}

/**
 * Get a livekit auth token that's valid for 6 hrs and allows joining rooms but not broadcasting video.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @param {string} roomName livekit room name that this user will be allowed to join
 * @param {string} userName  user name & identity that this user will get when joining the room / using livekit.
 * @returns {string} JWT access token */
export async function getFrontendAccessToken(apiKey: string, secretKey: string, roomName: string, userName: string, encryptionPassword: string | null = null) {
    const token = new AccessToken(apiKey, secretKey, {
        identity: userName,
        name: userName,
        ttl: 21600 // 6 hours in seconds,
    })
    token.addGrant({
        room: roomName,
        roomList: true,
        roomJoin: true,
        canPublish: false,
        canSubscribe: true,
        canPublishData: true,
        canUpdateOwnMetadata: false,
    });
    const unencryptedToken = await token.toJwt();
    if (encryptionPassword && encryptionPassword.length > 0) {
        logDebug("AuthToken before encryption for " + userName, unencryptedToken)
        return userName + "|" + await encryptAccessToken(ENCRYPTED_AUTH_TOKEN_PREFIX + unencryptedToken, encryptionPassword);
    } else {
        return userName + "|" + unencryptedToken;
    }
}

/**
 * Get a livekit server auth token that's valid for hundreds of years, but only has the ability to list open rooms.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @returns {string} JWT token */
export async function getLongTermStarterAccessToken(apiKey: string, secretKey: string): Promise<string> {
    const token = new AccessToken(apiKey, secretKey, {
        identity: 'lt',
        ttl: 9460800000 // 300 years
    })
    token.addGrant({
        roomList: true,
        roomJoin: false,
        canPublish: false,
        canSubscribe: false,
        canPublishData: false,
        canUpdateOwnMetadata: false,
    });
    return await token.toJwt();
}
