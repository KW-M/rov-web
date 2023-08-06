
import '../nodeShimsBundle'
import type * as livekitServerSDKTypes from 'livekit-server-sdk';
const AccessToken = globalThis.livekitServerSDK.AccessToken as typeof livekitServerSDKTypes.AccessToken

/**
 * Get a livekit auth token that's valid for 24 hrs and allows all actions.
 * @param apiKey livekit api key to use
 * @param secretKey livekit api secret key to use
 * @param rovName the room name & user identity to use.
 * @returns {string} JWT access token
 */
export function getPublisherAccessToken(apiKey: string, secretKey: string, rovName: string): string {
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
    return token.toJwt();
}

/**
 * Get a livekit auth token that's valid for 6 hrs and allows joining rooms but not broadcasting video.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @param {string} roomName livekit room name that this user will be allowed to join
 * @param {string} userName  user name & identity that this user will get when joining the room / using livekit.
 * @returns {string} JWT access token */
export function getFrontendAccessToken(apiKey: string, secretKey: string, roomName: string, userName: string) {
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
    return token.toJwt();
}

/**
 * Get a livekit server auth token that's valid for hundreds of years, but only has the ability to list open rooms.
 * @param {string} apiKey livekit api key to use
 * @param {string} secretKey livekit api secret key to use
 * @returns {string} JWT token */
export function getLongTermStarterAccessToken(apiKey: string, secretKey: string): string {
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
    return token.toJwt();
}
