import './app.css'
import App from './App.svelte'
import { connectionManager } from './lib/connectionManager';

window.onbeforeunload = () => {
  connectionManager.cleanup();
}

const app = new App({
  target: document.getElementById('app')
})

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
// }

// Use pagehide instead of unload to ensure the page cash isn't broken
// https://web.dev/bfcache/#optimize-your-pages-for-bfcache
// window.addEventListener('pagehide', () => {
//   // TODO: Close connections
//   connectionManager.cleanup();
// });

// // page is loaded or restored from bfcache.
// window.addEventListener('pageshow', () => {
//   // TODO: Reopen connections
//   connectionManager.start();
// });

export default app
