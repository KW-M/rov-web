export enum MotorTestOrder {
	MOTOR_TEST_ORDER_DEFAULT = 0, // Default autopilot motor test method.
	MOTOR_TEST_ORDER_SEQUENCE = 1, // Motor numbers are specified as their index in a predefined vehicle-specific sequence.
	MOTOR_TEST_ORDER_BOARD = 2, // Motor numbers are specified as the output as labeled on the board.
	MOTOR_TEST_ORDER_ENUM_END = 3, // 
}