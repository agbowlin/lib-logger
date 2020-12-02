//=====================================================================
//=====================================================================
//
//		Logger.js
//
//	- Define the API for the library's primary functionality.
//
//=====================================================================
//=====================================================================

"use strict";


exports.NewLogger =
	function NewLogger( Group )
	{
		// Contruct a new logger object.
		let logger = {};

		// Logger Info
		logger.Group = Group;
		logger.LogTargets = [];
		// logger.AlwaysUseUtc = false;


		//=====================================================================
		//=====================================================================
		//
		//		AddLogTarget
		//
		//=====================================================================
		//=====================================================================


		logger.AddLogTarget =
			function AddLogTarget( LogTarget )
			{
				logger.LogTargets.push( LogTarget );
				return LogTarget;
			};


		//=====================================================================
		//=====================================================================
		//
		//		LogMessageRaw
		//
		//=====================================================================
		//=====================================================================


		//---------------------------------------------------------------------
		/**
		 * Sends text directly to the log targets, bypassing all annotation and formatting.
		 * @param {string} Message The text to send to the log targets for rendering.
		 */
		logger.LogMessageRaw =
			function LogMessageRaw( Message )
			{
				var timestamp = new Date();
				logger.LogTargets.forEach(
					function ( log_target )
					{
						log_target.OnRenderLogText( timestamp, {}, Message );
					} );
			};


		//=====================================================================
		//=====================================================================
		//
		//		LogMessage
		//
		//=====================================================================
		//=====================================================================


		//---------------------------------------------------------------------
		/**
		 * Formats and annotates a text message and then renders it using each log target.
		 * @param {string} Message The text to send to the log targets for rendering.
		 * @param {char} Severity The character code severity rating: T, D, I, W, E, or F (case-insensitive).
		 * @param {any} ExtraData Any extra data to also be output.
		 */
		logger.LogMessage =
			function LogMessage( Message, Severity, ExtraData )
			{
				var timestamp = new Date();
				var log_entry = {};

				// Get the message group.
				log_entry.group = logger.Group;

				// Get the message timestamp.
				log_entry.date = timestamp.getFullYear() +
					"-" + ( "0" + ( timestamp.getMonth() + 1 ) ).slice( -2 ) +
					"-" + ( "0" + timestamp.getDate() ).slice( -2 );
				log_entry.time = ( "0" + timestamp.getHours() ).slice( -2 ) +
					":" + ( "0" + timestamp.getMinutes() ).slice( -2 ) +
					":" + ( "0" + timestamp.getSeconds() ).slice( -2 );
				log_entry.milliseconds = ( "000" + timestamp.getMilliseconds() ).slice( -4 );

				// Get the timezone offset.
				var timezone_minutes = timestamp.getTimezoneOffset() % 60;
				var timezone_hours = ( timestamp.getTimezoneOffset() - timezone_minutes ) / 60;
				log_entry.timezone = ( "0" + timezone_hours ).slice( -2 ) + ( "0" + timezone_minutes ).slice( -2 );

				// Get the message severity.
				Severity = Severity || 'INFO';
				log_entry.severity = Severity.substr( 0, 1 ).toUpperCase();
				if ( log_entry.severity == 'T' )
				{
					log_entry.severity_word = 'TRACE';
				}
				else if ( log_entry.severity == 'D' )
				{
					log_entry.severity_word = 'DEBUG';
				}
				else if ( log_entry.severity == 'I' )
				{
					log_entry.severity_word = 'INFO ';
				}
				else if ( log_entry.severity == 'W' )
				{
					log_entry.severity_word = 'WARN ';
				}
				else if ( log_entry.severity == 'E' )
				{
					log_entry.severity_word = 'ERROR';
				}
				else if ( log_entry.severity == 'F' )
				{
					log_entry.severity_word = 'FATAL';
				}
				else
				{
					log_entry.severity_word = Severity;
				}

				// Get the message.
				log_entry.message = Message;

				// Emit the log entry to the targets.
				logger.LogTargets.forEach(
					function ( log_target )
					{
						let log_levels = log_target.Config.LogLevels.toUpperCase();
						if ( log_levels.indexOf( log_entry.severity ) >= 0 )
						{
							// Make a copy of the log entry and let the log target prepare it.
							let device_log_entry = JSON.parse( JSON.stringify( log_entry ) );
							log_target.OnPrepareLogEntry( device_log_entry );

							// Construct the output message.
							var out_message = '';
							var left_side = '| ';
							var right_side = ' ';
							if ( log_target.Config.OutputGroup && device_log_entry.group )
							{
								out_message += left_side + device_log_entry.group + right_side;
							}
							if ( log_target.Config.OutputDate && device_log_entry.date )
							{
								out_message += left_side + device_log_entry.date + right_side;
							}
							if ( log_target.Config.OutputTime && device_log_entry.time )
							{
								out_message += left_side + device_log_entry.time + right_side;
							}
							if ( log_target.Config.OutputMilliseconds && device_log_entry.milliseconds )
							{
								out_message += left_side + device_log_entry.milliseconds + right_side;
							}
							if ( log_target.Config.OutputTimezone && device_log_entry.timezone )
							{
								out_message += left_side + device_log_entry.timezone + right_side;
							}
							if ( log_target.Config.OutputSeverityWord )
							{
								out_message += left_side + device_log_entry.severity_word + right_side;
							}
							else if ( log_target.Config.OutputSeverity )
							{
								out_message += left_side + device_log_entry.severity + right_side;
							}
							out_message += left_side + device_log_entry.message;

							// Add the extra data.
							if ( ExtraData )
							{
								out_message += "\n" + JSON.stringify( ExtraData, undefined, "    " );
							}

							// Emit the log entry to the log target for rendering.
							// Logger.SendTextToLogTarget( date, out_message, log_target );
							log_target.OnRenderLogText( timestamp, device_log_entry, out_message );
						}
					} );

				// Return the message.
				return log_entry;
			};


		//=====================================================================
		//=====================================================================
		//
		//		Some syntactic sugar for declarative functions
		//
		//=====================================================================
		//=====================================================================


		logger.LogTrace =
			function LogTrace( Message, ExtraData )
			{
				logger.LogMessage( Message, 'TRACE', ExtraData );
			};
		logger.LogDebug =
			function LogDebug( Message, ExtraData )
			{
				logger.LogMessage( Message, 'DEBUG', ExtraData );
			};
		logger.LogInfo =
			function LogInfo( Message, ExtraData )
			{
				logger.LogMessage( Message, 'INFO', ExtraData );
			};
		logger.LogWarn =
			function LogWarn( Message, ExtraData )
			{
				logger.LogMessage( Message, 'WARN', ExtraData );
			};
		logger.LogWarning =
			function LogWarning( Message, ExtraData )
			{
				logger.LogMessage( Message, 'WARN', ExtraData );
			};
		logger.LogError =
			function LogError( Message, ExtraData )
			{
				logger.LogMessage( Message, 'ERROR', ExtraData );
			};
		logger.LogFatal =
			function LogError( Message, ExtraData )
			{
				logger.LogMessage( Message, 'FATAL', ExtraData );
			};


		//=====================================================================
		//=====================================================================
		//
		//		More sugar for common logger interoperability
		//			- (e.g. MongoDB.logger)
		//
		//=====================================================================
		//=====================================================================


		logger.trace =
			function trace( Message, ExtraData )
			{
				logger.LogMessage( Message, 'TRACE', ExtraData );
			};
		logger.debug =
			function debug( Message, ExtraData )
			{
				logger.LogMessage( Message, 'DEBUG', ExtraData );
			};
		logger.info =
			function info( Message, ExtraData )
			{
				logger.LogMessage( Message, 'INFO', ExtraData );
			};
		logger.log =
			function log( Message, ExtraData )
			{
				logger.LogMessage( Message, 'INFO', ExtraData );
			};
		logger.warn =
			function warn( Message, ExtraData )
			{
				logger.LogMessage( Message, 'WARN', ExtraData );
			};
		logger.warning =
			function warning( Message, ExtraData )
			{
				logger.LogMessage( Message, 'WARN', ExtraData );
			};
		logger.error =
			function error( Message, ExtraData )
			{
				logger.LogMessage( Message, 'ERROR', ExtraData );
			};
		logger.fatal =
			function fatal( Message, ExtraData )
			{
				logger.LogMessage( Message, 'FATAL', ExtraData );
			};


		//=====================================================================
		//=====================================================================
		//
		//		Convenience Functions
		//
		//=====================================================================
		//=====================================================================


		logger.LogBlankLine = () => logger.LogMessageRaw( '' );
		logger.LogSeparatorLine = () => logger.LogMessageRaw( '==========================================' );


		// Return the logger object.
		return logger;
	};
