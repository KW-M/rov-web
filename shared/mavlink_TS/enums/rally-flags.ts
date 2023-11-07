export enum RallyFlags {
	FAVORABLE_WIND = 1, // Flag set when requiring favorable winds for landing.
	LAND_IMMEDIATELY = 2, // Flag set when plane is to immediately descend to break altitude and land without GCS intervention. Flag not set when plane is to loiter at Rally point until commanded to land.
	RALLY_FLAGS_ENUM_END = 3, // 
}