import './app.css'
import App from './App.svelte'
import { ConnectionManager } from './lib/connectionManager'
import { classInstances } from './lib/globalContext'
import { MessageHandler } from './lib/messageHandler'


let connMngr = classInstances.connManager = new ConnectionManager();
let msgHandler = classInstances.msgHandler = MessageHandler;
msgHandler.setSendMessageCallback(connMngr.sendMessageToCurrentRov);
connMngr.


const app = new App({
  target: document.getElementById('app')
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}



export default app
