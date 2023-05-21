
import '../../js/nodeShimsBundle'

import type * as livekitServerSDKTypes from 'livekit-server-sdk';
import { getFrontendAccessToken } from './livekitTokens';
import { LivekitSetupOptions } from './clientActions';

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
