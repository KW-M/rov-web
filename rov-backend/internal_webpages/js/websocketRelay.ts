

/*
    Wrapper class for the WebSocket built-in javascript module. Acts as a proxy for communication
    between the iROV internal website and its python code. At the time of writing this comment (5/22/2023)
    the URL for the websocket server that the iROV python is expected to host is ws://localhost:8765/
*/
export class WebSocketRelay {
    
    socket: WebSocket
    msgReceivedFn: (msgEvent: MessageEvent<Uint8Array>) => void 
    isRunning: boolean
    isConnected: boolean
    
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
    }

    /*
        This function MUST be invoked for the iROV to even start reaching out to connect.
        After it is called, it will continue attempting to maintain connection unless stop()
        is invoked.
    */
    start(msgReceivedFn: (msgEvent: MessageEvent<Uint8Array>) => void) {
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
        this.socket = new WebSocket("ws://localhost:8765/");
        this.isConnected = true
        this.socket.addEventListener('close', (event) => {
          console.log('WebSocket connection closed with code:', event.code);
          this.isConnected = false
          if(this.isRunning) setTimeout(this.connect, 2000); // Attempt to reconnect after a delay
        });
      
        this.socket.addEventListener('error', (error) => {
          console.error('WebSocket error:', error);
          this.isConnected = false
          if(this.isRunning) setTimeout(this.connect, 2000); // Attempt to reconnect after a delay
        });

        this.socket.addEventListener("message", this.msgReceivedFn)
      
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