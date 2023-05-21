import { DECODE_TXT, ENCODE_TXT } from './consts';
import './nodeShimsBundle'

import type * as SimplePeerType from 'simple-peer';
const SimplePeer = globalThis.SimplePeer as typeof SimplePeerType

type MsgRecivedCallback = (msg: Uint8Array) => void;
type StateChangeCallback = (connState: string) => void;
type SendSignalingMsgCallback = (msg: Uint8Array) => void;

export class SimplePeerConnection {

    p: SimplePeerType.Instance;
    msgSendQueue: ArrayBufferLike[] = [];

    onMesssageRecived: MsgRecivedCallback;
    onConnStateChange: StateChangeCallback;
    onOutgoingSignalMsg: SendSignalingMsgCallback;

    constructor(onMesssageRecived: MsgRecivedCallback, onConnStateChange: StateChangeCallback, onOutgoingSignalMsg: SendSignalingMsgCallback) {
        this.onMesssageRecived = (msg: Uint8Array) => onMesssageRecived(msg);
        this.onConnStateChange = (connState: string) => onConnStateChange(connState);
        this.onOutgoingSignalMsg = (msg: Uint8Array) => onOutgoingSignalMsg(msg);
    }

    async start(simplePeerOpts: any) {
        this.p = new SimplePeer(simplePeerOpts);

        this.p.on('signal', (signalData: Object) => {
            console.log("SIMPLEPEER sendSignallingMsgCallback: ", signalData)
            this.onOutgoingSignalMsg(ENCODE_TXT(JSON.stringify(signalData)));
        })

        this.p.on('connect', () => {
            // wait for 'connect' event before using the data channel
            this._emptyMsgQueue();
        })

        this.p.on('data', data => {
            // got a data channel message
            console.log('SIMPLEPEER: got a dc message: ', data)
        })

        this.p.on('stream', stream => {
            // got remote video stream, now let's show it in a video tag
            console.info('SIMPLEPEER: got video stream: ', stream)
            var video = document.getElementById('direct_video') as HTMLVideoElement;
            if ('srcObject' in video) {
                video.srcObject = stream
            } else {
                // @ts-ignore
                video.src = window.URL.createObjectURL(stream) // for older browsers
            }

            video.play()
        })
    }

    sendMessage(data: ArrayBufferLike) {
        this.msgSendQueue.push(data)
        this._emptyMsgQueue();
    }

    _emptyMsgQueue() {
        if (!this.p || !this.p.connected) return false;
        const len = this.msgSendQueue.length
        for (let i = 0; i < len; i++) {
            this.p.send(this.msgSendQueue[i]);
        }
    }

    handleSignalingMsg(signalData: Uint8Array) {
        let json = '';
        try {
            json = DECODE_TXT(signalData);
            const signal = JSON.parse(json);
            this.p.signal(signal)
        } catch (err) {
            console.warn("failed to parse signalling message: ", json, err.message)
        };
    }
}
