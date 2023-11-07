export enum GoproCaptureMode {
	GOPRO_CAPTURE_MODE_VIDEO = 0, // Video mode.
	GOPRO_CAPTURE_MODE_PHOTO = 1, // Photo mode.
	GOPRO_CAPTURE_MODE_BURST = 2, // Burst mode, Hero 3+ only.
	GOPRO_CAPTURE_MODE_TIME_LAPSE = 3, // Time lapse mode, Hero 3+ only.
	GOPRO_CAPTURE_MODE_MULTI_SHOT = 4, // Multi shot mode, Hero 4 only.
	GOPRO_CAPTURE_MODE_PLAYBACK = 5, // Playback mode, Hero 4 only, silver only except when LCD or HDMI is connected to black.
	GOPRO_CAPTURE_MODE_SETUP = 6, // Playback mode, Hero 4 only.
	GOPRO_CAPTURE_MODE_UNKNOWN = 255, // Mode not yet known.
	GOPRO_CAPTURE_MODE_ENUM_END = 256, // 
}