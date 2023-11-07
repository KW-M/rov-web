export enum LimitsState {
	LIMITS_INIT = 0, // Pre-initialization.
	LIMITS_DISABLED = 1, // Disabled.
	LIMITS_ENABLED = 2, // Checking limits.
	LIMITS_TRIGGERED = 3, // A limit has been breached.
	LIMITS_RECOVERING = 4, // Taking action e.g. Return/RTL.
	LIMITS_RECOVERED = 5, // We're no longer in breach of a limit.
	LIMITS_STATE_ENUM_END = 6, // 
}