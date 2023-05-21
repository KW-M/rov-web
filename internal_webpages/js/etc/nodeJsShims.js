// Do not import this file directly, run npm compile:browserify to turn this file into nodeShimsBundle.js
const sdk = require('livekit-server-sdk')
window.livekitServerSDK = sdk;

const simplepeer = require('simple-peer')
window.SimplePeer = simplepeer;


// module.exports = {
//     livekitServerSDK: sdk
// }
