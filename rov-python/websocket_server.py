import asyncio
import websockets

class WebSocketServer:

    def init(self, msgReceivedFn):
        self.msgReceivedFn = msgReceivedFn
        self.connections = set()

    async def _register(self, websocket, path):
        self.connections.add(websocket)
        print("Client connected to Web Socket Server: ", websocket)

        # While client is connected, await messages and process them
        # with the provided message-received-function
        async for message in websocket:
            await self.msgReceivedFn(message)

        print("Client disconnected from Web Socket Server: ", websocket)
        self.connections.remove(websocket)

    """Send out a message to all connected clients"""
    async def broadcast(self, message):
        websockets.broadcast(self.connections, message)


    """Start Websocket Server"""
    async def start_wss(self, port=8765):
        async with websockets.serve(self._register, "127.0.0.1", port):
            await asyncio.Future()  # run forever

    def is_connected(self):
        return len(self.connections) > 0
websocket_server = WebSocketServer()
