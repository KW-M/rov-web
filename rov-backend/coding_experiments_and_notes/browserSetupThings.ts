import { getFrontendAccessToken, getLongTermStarterAccessToken } from "../../shared/js/livekit/livekitTokens";
console.log("LongTermLivekitToken", getLongTermStarterAccessToken("LivekitApiKey", "LivekitSecretKey"))
console.log("Short-Term_Room-Specific_Token", getFrontendAccessToken("LivekitApiKey", "LivekitSecretKey", "RoomName", "UserName" + Date.now().toString()))
