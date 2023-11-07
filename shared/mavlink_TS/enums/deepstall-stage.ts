export enum DeepstallStage {
	DEEPSTALL_STAGE_FLY_TO_LANDING = 0, // Flying to the landing point.
	DEEPSTALL_STAGE_ESTIMATE_WIND = 1, // Building an estimate of the wind.
	DEEPSTALL_STAGE_WAIT_FOR_BREAKOUT = 2, // Waiting to breakout of the loiter to fly the approach.
	DEEPSTALL_STAGE_FLY_TO_ARC = 3, // Flying to the first arc point to turn around to the landing point.
	DEEPSTALL_STAGE_ARC = 4, // Turning around back to the deepstall landing point.
	DEEPSTALL_STAGE_APPROACH = 5, // Approaching the landing point.
	DEEPSTALL_STAGE_LAND = 6, // Stalling and steering towards the land point.
	DEEPSTALL_STAGE_ENUM_END = 7, // 
}