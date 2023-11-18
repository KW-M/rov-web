import { ENCODE_TXT } from "./shared/consts"


/*
    Wrapper class for the WebSocket built-in javascript module. Acts as a proxy for communication
    between the iROV internal website and its python code. At the time of writing this comment (5/22/2023)
    the URL for the websocket server that the iROV python is expected to host is ws://localhost:8765/
*/
export class WebSocketRelay {

    socket: WebSocket
    serverAddress: string
    msgReceivedFn: (msg: Uint8Array) => void
    isRunning: boolean
    isConnected: boolean
    connectionTimerId // type is "a positive integer"

    /*
        When instantiated, an arbitrary callback function is expected to handle incoming messages
        from the iROV. The boolean flag isConnected is used to keep track of the connection status
        and is set to false by default. isRunning is used to track whether or not the relay should actively
        try to connect/reconnect (in the event of an error or the socket getting closed.) By default, this
        is false and is set to true only when the user activates the relay using the start() method.
    */
    constructor() {
        this.isConnected = false
        this.isRunning = false
        this.connectionTimerId = 0
        this.serverAddress = ""
    }

    /*
        This function MUST be invoked for the iROV to even start reaching out to connect.
        After it is called, it will continue attempting to maintain connection unless stop()
        is invoked.
    */
    start(serverAddress: string, msgReceivedFn: (msg: Uint8Array) => void) {
        this.serverAddress = serverAddress
        this.msgReceivedFn = msgReceivedFn;
        this.isRunning = true
        this.connect()
    }

    stop() {
        this.isRunning = false
        this.socket.close()
    }

    /*
        Meant to be used internally. Connection and Reconnection both occur through instantiating a new
        WebSocket and assigning callbacks. Arbitrary delays occur in the event of a di
    */
    connect() {
        console.log("Attempting to connect to websocket: " + this.serverAddress)
        this.socket = new WebSocket(this.serverAddress);
        this.socket.binaryType = "blob"
        this.isConnected = true
        this.socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed with code: ', event.code);
            this.isConnected = false
            if (this.isRunning) this.queueConnect()
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            this.isConnected = false
            if (this.isRunning) this.queueConnect()
        });

        this.socket.addEventListener("message", (msgEvent: MessageEvent<Blob> | MessageEvent<string>) => {
            if (typeof msgEvent.data === "string") this.msgReceivedFn(ENCODE_TXT(msgEvent.data))
            else msgEvent.data.arrayBuffer().then((arrayBuffer) => {
                this.msgReceivedFn(new Uint8Array(arrayBuffer))
            })
        })

    }

    /*
        Helper function that sets a delay for the connect() function to be called
        asynchronously. Used for trying to reconnect if the server is unresponsive
    */
    queueConnect() {
        // console.log("queuing connect(), clearing ID=", this.connectionTimerId)
        clearTimeout(this.connectionTimerId) // Unqueue any current connection events.
        this.connectionTimerId = setTimeout(this.connect.bind(this), 2000); // Attempt to reconnect after a delay
        // console.log("finished queuing connect(), new ID=", this.connectionTimerId)
    }

    getIsConnected() {
        return this.isConnected
    }

    /*
        Sends an arbitrary byte sequence through the WebSocket
    */
    sendMessage(message: Uint8Array) {
        this.socket.send(message)
    }


}

export const iRovWebSocketRelay = new WebSocketRelay()
