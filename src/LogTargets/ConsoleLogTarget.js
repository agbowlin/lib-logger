//=====================================================================
//=====================================================================
//
//		ConsoleLogTarget.js
//
//	- A log target which outputs log entries to the console.
//
//=====================================================================
//=====================================================================

"use strict";


const LIB_LOG_TARGET = require( './LogTarget.js' );


exports.NewConsoleLogTarget =
	function NewConsoleLogTarget( LogLevels )
	{
		//---------------------------------------------------------------------
		// Create a new log target object.
		let log_target = LIB_LOG_TARGET.NewLogTarget();

		//---------------------------------------------------------------------
		// LogTarget Config
		log_target.Config.DeviceName = 'console';
		log_target.Config.LogLevels = LogLevels || 'TDIWEF';

		//---------------------------------------------------------------------
		// ConsoleLogTarget Config
		log_target.Config.Console = {};


		//=====================================================================
		//=====================================================================
		//
		//		OnPrepareLogEntry
		//
		//=====================================================================
		//=====================================================================


		log_target.OnPrepareLogEntry =
			( LogEntry ) => 
			{
				return;
			};


		//=====================================================================
		//=====================================================================
		//
		//		OnRenderLogText
		//
		//=====================================================================
		//=====================================================================


		log_target.OnRenderLogText =
			( Timestamp, LogEntry, LogText ) => 
			{
				console.log( LogText );
				return;
			};


		//---------------------------------------------------------------------
		// Return the log target object.
		return log_target;
	};
