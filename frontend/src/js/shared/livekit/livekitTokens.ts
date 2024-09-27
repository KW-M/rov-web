
import { AccessToken, type AccessTokenOptions } from "livekit-server-sdk";
import { DECODE_TXT, ENCODE_TXT, ENCRYPTED_AUTH_TOKEN_PREFIX } from "../consts";
import { encrypt } from "../encryption";
import { log, logDebug, logInfo, logWarn, logError } from "../logging"
import { decodeJwt } from "jose";
import { unixTimeNow } from "../time";

/** A hack to silence false warnings about including the secret key in the web bundle
 * This is fine so long as the secret key is only found in the rov internal/backend chromium instance!!
 * @param toRun any function
 * @returns the result of calling toRun */
export const silenceFalseSecurityNotice = <T>(toRun: (...args: any) => T) => {
    const realConsoleError = console.error;
    Object.assign(console, {
        error: (...args) => {
            if (!args[0] || !args[0].toString || !args[0].toString().includes("You should not include your API secret in your web client bundle")) realConsoleError.apply(console, args);
        }
    });
    const result = toRun();
    Object.assign(console, { error: realConsoleError });
    return result;
}

/** Get an access token JWT for livekit.
 * This function should ONLY be called from the backend server.
 * Includes a hack to silence false warnings about including the secret key in the web bundle
 * @param apiKey livekit api key to use
 * @param secretKey livekit api secret key to use
 * @param options the access token options passed to new AccessToken().
 * @returns {AccessToken} livekit access token object*/
const getAccessToken = (apiKey: string, secretKey: string, options: AccessTokenOptions) => {
    return silenceFalseSecurityNotice(() => new AccessToken(apiKey, secretKey, options));
}


export const isTokenValid = async (plaintextToken: string) => {
    try {
        const tokenInfo = await decodeJwt(plaintextToken);
        const expired = !tokenInfo.exp || (tokenInfo.exp < unixTimeNow() / 1000);
        const beforeValid = !!tokenInfo.nbf && (tokenInfo.nbf > unixTimeNow() / 1000);
        logDebug("isTokenValid() tokenInfo: ", tokenInfo, "expired: ", expired, "beforeValid: ", beforeValid, "now: ", unixTimeNow() / 1000, "valid: ", !expired && !beforeValid, tokenInfo);
        if (!expired && !beforeValid) return tokenInfo.sub; // return the user id if the token is valid
        return false;
    } catch (e) {
        logError("Error in decodeJwt() on auth token: ", e);
    }
}

/**
 * Get a livekit auth token that's valid for 24 hrs and allows all actions.
 * @param apiKey livekit api key to use
 * @param secretKey livekit api secret key to use
 * @param rovName the room name & user identity to use.
 * @returns {string} JWT access token
 */
export async function getPublisherAccessToken(apiKey: string, secretKey: string, rovName: string): Promise<string> {
    const token = getAccessToken(apiKey, secretKey, {
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

export async function encryptAccessToken(accessToken: string, password: string): Promise<{ salt: string, iv: string, token: string }> {
    const { encryptedText, iv, salt } = await encrypt(accessToken, password)
    return { salt, iv, token: encryptedText };
}

/**
 * Get a livekit auth token that's valid for 6 hrs and allows joining rooms but not broadcasting video.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @param {string} roomName livekit room name that this user will be allowed to join
 * @param {string} userName  user name & identity that this user will get when joining the room / using livekit.
 * @returns {string} JWT access token */
export async function getFrontendAccessToken(apiKey: string, secretKey: string, roomName: string, userName: string) {
    const token = getAccessToken(apiKey, secretKey, {
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
    const rawToken = await token.toJwt();
    return rawToken
}

/**
 * Get a livekit server auth token that's valid for hundreds of years, but only has the ability to list open rooms.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @returns {string} JWT token */
export async function getLongTermStarterAccessToken(apiKey: string, secretKey: string): Promise<string> {
    const token = getAccessToken(apiKey, secretKey, {
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


/**
 * Get a livekit server auth token that's valid for hundreds of years, but only has the ability to list open rooms.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @returns {string} JWT token */
export async function getLongTermTestRoomAccessToken(apiKey: string, secretKey: string): Promise<string> {
    const token = getAccessToken(apiKey, secretKey, {
        identity: 'lt',
        ttl: 600,
        // ttl: 9460800000 // 300 years
    })
    token.addGrant({

        hidden: false,
        room: "connection-test-room",
        roomList: true,
        roomJoin: true,
        roomRecord: false,
        roomCreate: false,
        roomAdmin: false,
        canPublish: false,
        canSubscribe: false,
        canPublishData: false,
        canUpdateOwnMetadata: false,
    });
    return await token.toJwt();
}
