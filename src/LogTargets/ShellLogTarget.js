//=====================================================================
//=====================================================================
//
//		ShellLogTarget.js
//
//	- A log target which outputs log entries to the console.
//
//=====================================================================
//=====================================================================

"use strict";


const LIB_LOG_TARGET = require( './LogTarget.js' );
const LIB_SHELL_COLORS = require( '../ShellColors.js' );


exports.NewShellLogTarget =
	function NewShellLogTarget( LogLevels )
	{
		//---------------------------------------------------------------------
		// Create a new log target object.
		let log_target = LIB_LOG_TARGET.NewLogTarget();

		//---------------------------------------------------------------------
		// LogTarget Config
		log_target.Config.DeviceName = 'shell';
		log_target.Config.LogLevels = LogLevels || 'TDIWEF';

		//---------------------------------------------------------------------
		// ShellLogTarget Config
		log_target.Config.Shell = {
			ColorizeEntireLine: false,
			ColorizeSeverity: false,
			ColorizeMessage: false,
			TraceColors: { Backcolor: null, Forecolor: null, Effect: null, },
			DebugColors: { Backcolor: null, Forecolor: null, Effect: null, },
			InfoColors: { Backcolor: null, Forecolor: null, Effect: null, },
			WarnColors: { Backcolor: null, Forecolor: null, Effect: null, },
			ErrorColors: { Backcolor: null, Forecolor: null, Effect: null, },
			FatalColors: { Backcolor: null, Forecolor: null, Effect: null, },
		};


		//---------------------------------------------------------------------
		function get_colors_for_severity( ConfigShell, Severity )
		{
			if ( Severity === 'T' ) { return ConfigShell.TraceColors; }
			else if ( Severity === 'D' ) { return ConfigShell.DebugColors; }
			else if ( Severity === 'I' ) { return ConfigShell.InfoColors; }
			else if ( Severity === 'W' ) { return ConfigShell.WarnColors; }
			else if ( Severity === 'E' ) { return ConfigShell.ErrorColors; }
			else if ( Severity === 'F' ) { return ConfigShell.FatalColors; }
			return null;
		}


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
				if ( log_target.Config.Shell.ColorizeEntireLine ) { return; }
				let colors = get_colors_for_severity( log_target.Config.Shell, LogEntry.severity );
				if ( !colors ) { return; }
				if ( log_target.Config.Shell.ColorizeSeverity )
				{
					LogEntry.severity = LIB_SHELL_COLORS.ShellText( LogEntry.severity, colors.Backcolor, colors.Forecolor, colors.Effect );
					LogEntry.severity_word = LIB_SHELL_COLORS.ShellText( LogEntry.severity, colors.Backcolor, colors.Forecolor, colors.Effect );
				}
				if ( log_target.Config.Shell.ColorizeMessage )
				{
					LogEntry.message = LIB_SHELL_COLORS.ShellText( LogEntry.message, colors.Backcolor, colors.Forecolor, colors.Effect );
				}
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
				if ( log_target.Config.Shell.ColorizeEntireLine ) 
				{
					let colors = get_colors_for_severity( log_target.Config.Shell, LogEntry.severity );
					if ( colors ) 
					{
						LogText = LIB_SHELL_COLORS.ShellText( LogText, colors.Backcolor, colors.Forecolor, colors.Effect );
					}
				}
				console.log( LogText );
				return;
			};


		//---------------------------------------------------------------------
		// Return the log target object.
		return log_target;
	};
