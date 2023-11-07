export enum ScriptingCmd {
	SCRIPTING_CMD_REPL_START = 0, // Start a REPL session.
	SCRIPTING_CMD_REPL_STOP = 1, // End a REPL session.
	SCRIPTING_CMD_STOP = 2, // Stop execution of scripts.
	SCRIPTING_CMD_STOP_AND_RESTART = 3, // Stop execution of scripts and restart.
	SCRIPTING_CMD_ENUM_END = 4, // 
}