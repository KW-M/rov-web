import type { RovAction, RovResponse } from "./protobufs/rov_actions";

type SimpleMessageBrokerConfig<s, r> = {
    /** true if this side of the connection should send the first message */
    initiator: boolean,
    /** delay for resending messages in miliseconds */
    resendDelay: number,
    /** this callback is for sending a message out on the transport layer */
    sendMsgToTransport: (msg: s, counter: number) => void,
    /** this callback is for handing off a recived message to the buisness logic */
    processRecivedMsg: (msg: r) => void,
}


/** This class Implements a simple bidirectional message delivery gaurentee protocol
 * Each side of the connection maintains a SimpleMessageBroker instance
 * Each side will only send a message after reciving a message from the other side
 * SO messages will ping pong back and forth each blocking the other side from sending until the next message is recived
 * Messages will be sent in queued fifo order and will be resent every second until a message is recived
 */
export class SimpleMessageBroker<s, r> {
    private _config: SimpleMessageBrokerConfig<s, r>;
    private _messageCounter: number = 0;
    private _nextMessageCounter: number = 0;
    private _messageQueue: s[] = [];
    private _hasRecivedMessage: boolean = false;
    private _hasSentFirstMessage: boolean = false;
    private _dequeing: boolean = false;




    constructor(config: SimpleMessageBrokerConfig<s, r>) {
        this._config = config;
        if (config.initiator === true) this._messageCounter = 1;
        console.log("initiating reli", this._messageCounter, this._config);
    }


    private async _dequeueMsgs() {
        // Dequeue the message at the beginning of the queue
        // repeat sending the message every second until another message is recived,
        // then send the next message. Repeat steps until the queue is empty
        this._dequeing = true;
        while (this._messageQueue.length > 0) {
            let msg = this._messageQueue[0];
            if (msg == undefined) {
                this._messageQueue.shift();
                continue;
            }

            // if (this._hasSentFirstMessage || this._config.initiator === true) {
            console.log("sending reli message", this._messageCounter);
            this._config.sendMsgToTransport(msg, this._messageCounter);
            //     this._hasSentFirstMessage = true;
            // }


            if (this._hasRecivedMessage === true) {
                this._messageQueue.shift();
                this._hasRecivedMessage = false;
                this._messageCounter = this._nextMessageCounter;
            } else {
                await new Promise(resolve => setTimeout(resolve, this._config.resendDelay));
            }
        }
        this._dequeing = false;
    }

    public send(msg: s) {
        /// Queue the message
        console.log("queuing reli message", this._messageCounter);
        this._messageQueue.push(msg);
        // start the deque process if it is not already running
        if (!this._dequeing) this._dequeueMsgs();
    }

    public receive(msg: r, counter: number) {
        // ignore (resent) messages that are older than the last message recived
        console.log("recived reli message", counter, this._messageCounter);
        if (counter <= this._messageCounter) return;
        this._hasRecivedMessage = true;

        this._nextMessageCounter = counter + 1;
        this._config.processRecivedMsg(msg);
        // start the deque process if it is not already running
        if (!this._dequeing) this._dequeueMsgs();
    }
}
