export enum LedControlPattern {
	LED_CONTROL_PATTERN_OFF = 0, // LED patterns off (return control to regular vehicle control).
	LED_CONTROL_PATTERN_FIRMWAREUPDATE = 1, // LEDs show pattern during firmware update.
	LED_CONTROL_PATTERN_CUSTOM = 255, // Custom Pattern using custom bytes fields.
	LED_CONTROL_PATTERN_ENUM_END = 256, // 
}