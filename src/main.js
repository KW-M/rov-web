import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
// }

// Use pagehide instead of unload to ensure the page cash isn't broken
// https://web.dev/bfcache/#optimize-your-pages-for-bfcache
window.addEventListener('pagehide', () => {
  // TODO: Close connections
});

// page is loaded or restored from bfcache.
window.addEventListener('pageshow', () => {
  // TODO: Reopen connections
});

export default app
