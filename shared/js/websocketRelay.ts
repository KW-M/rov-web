
export class WebSocketRelay {
    
    ws: WebSocket
    
    constructor() {
        this.ws = new WebSocket("ws://localhost:8765/");
    }

    start() {
        this.ws.addEventListener("open", this.onOpen);
        this.ws.addEventListener("message", this.onMessageReceived);
        this.ws.addEventListener("close", this.onClose);
        this.ws.addEventListener("error", this.onError);
    }

    onOpen(event) {
        
    }

    onMessageReceived(event) {

    }

    onClose(event) {

    }

    onError(event) {

    }


}