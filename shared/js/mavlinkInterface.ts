// import ardupilotmega from "node-mavlink"
// new ardupilotmega.common.ManualControl()
import { messageRegistry } from "../mavlink_TS/message-registry";
import { ManualControl } from "../mavlink_TS/messages/manual-control";
import { MAVLinkModule } from "@ifrunistuttgart/node-mavlink"

const MAVLINK_SYSTEM_ID = 254
const mavlink = new MAVLinkModule(messageRegistry, MAVLINK_SYSTEM_ID, false)

export async function parseMavlinkBuffer(buffer: Buffer) {
    return await mavlink.parse(buffer)
}

// mavlink.parse(Buffer.from([254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).then((msg) => {
//     msg[0]._message_id
// })

export function getManualControlMessage(x, y, z, r) {
    const m = new ManualControl(254, 1)
    m.x = x
    m.y = y
    m.z = z
    m.r = r
    mavlink.pack([m])
}
