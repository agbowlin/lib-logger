//=====================================================================
//=====================================================================
//
//		LogTarget.js
//
//	- Define the base class LogTarget used for log target implementations.
//	- A LogTarget stores settings and functions for outputting text
//		to a particular device (e.g. console, file, etc.).
//
//=====================================================================
//=====================================================================

"use strict";


exports.NewLogTarget =
	function NewLogTarget()
	{
		// Create a new log target object.
		let log_target = {};

		// LogTarget Config
		log_target.Config = {};
		log_target.Config.DeviceName = '';
		log_target.Config.LogLevels = '';
		log_target.Config.OutputGroup = true;
		log_target.Config.OutputDate = true;
		log_target.Config.OutputTime = true;
		log_target.Config.OutputMilliseconds = true;
		log_target.Config.OutputTimezone = true;
		log_target.Config.OutputSeverity = true;
		log_target.Config.OutputSeverityWord = true;

		// LogTarget Virtual Functions
		log_target.OnPrepareLogEntry = ( LogEntry ) => { throw new Error( `Function [OnPrepareLogEntry] not implemented by LogTarget!` ); };
		log_target.OnRenderLogText = ( Timestamp, LogEntry, LogText ) => { throw new Error( `Function [OnRenderLogText] not implemented by LogTarget!` ); };

		// Return the log target object.
		return log_target;
	};
