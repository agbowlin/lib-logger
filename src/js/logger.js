//=====================================================================
//=====================================================================
//
//		Logger.js
//
//=====================================================================
//=====================================================================

"use strict";

var Logger = function(Group, LogDevice, LogLevels)
{


	//=====================================================================
	// Determine the platform we are executing on.
	var platform = '';
	if (typeof phantom != 'undefined')
	{
		platform = 'phantomjs';
	}
	else if (typeof require('path') != 'undefined')
	{
		platform = 'nodejs';
	}
	else
	{
		platform = 'browser';
	}


	//=====================================================================
	// Construct a platform specific file function.
	var npm_fs = null;
	var npm_path = null;

	function FileAppendTextLine(Path, Filename, Text)
	{
		if (platform == 'browser')
		{
			return;
		}
		else if (platform == 'nodejs')
		{
			if (!npm_fs)
			{
				npm_fs = require('fs');
			}
			if (!npm_path)
			{
				npm_path = require('path');
			}
			var filename = npm_path.join(Path, Filename);
			npm_fs.appendFileSync(filename, Text + "\n");
			return;
		}
		else if (platform == 'phantomjs')
		{
			if (!npm_fs)
			{
				npm_fs = require('fs');
			}
			var filename = Path;
			if (filename)
			{
				filename += npm_fs.separator;
			}
			filename += Filename;
			npm_fs.write(filename, Text + "\n", 'a');
			return;
		}

	}


	var Logger = {};


	//=====================================================================
	// Logger configuration object.
	Logger.Config = {
		group: '',
		always_use_utc: false,
		targets: []
	};


	//=====================================================================
	Logger.AddLogTarget =
		function AddLogTarget(LogDevice, LogLevels)
		{
			LogLevels = LogLevels || 'TDIWEF';
			var log_target = {
				log_device: LogDevice,
				log_levels: LogLevels,
				// Output options (all devices)
				output_group: true,
				output_date: true,
				output_time: true,
				output_milliseconds: true,
				output_timezone: true,
				output_severity: true,
				output_severity_words: true,
				// Options for file device
				log_path: '',
				log_filename: 'logger',
				log_extension: 'log',
				use_hourly_logfiles: false,
				use_daily_logfiles: false
			};
			Logger.Config.targets.push(log_target);
			return log_target;
		};


	//=====================================================================
	Logger.SendTextToLogTarget =
		function SendTextToLogTarget(Timestamp, Text, LogTarget)
		{
			if ((LogTarget.log_device == 'console') || (LogTarget.log_device == 'stdout'))
			{
				console.log(Text);
			}
			else if (LogTarget.log_device == 'stderr')
			{
				console.error(Text);
			}
			else if (LogTarget.log_device == 'file')
			{
				var filename = LogTarget.log_filename;
				if (LogTarget.use_hourly_logfiles)
				{
					filename += '-' + Timestamp.toISOString().slice(0, 13).replace(/T/g, '-');
				}
				else if (LogTarget.use_daily_logfiles)
				{
					filename += '-' + Timestamp.toISOString().slice(0, 10);
				}
				if (LogTarget.log_extension)
				{
					filename += '.' + LogTarget.log_extension;
				}
				FileAppendTextLine(LogTarget.log_path, filename, Text);
			}
			return;
		};


	//=====================================================================
	Logger.LogMessage =
		function LogMessage(Message, Severity, ExtraData)
		{
			var date = new Date();
			var log_entry = {};

			// Get the message group.
			log_entry.group = Logger.Config.group;

			// Get the message timestamp.
			log_entry.date = date.getFullYear() +
				"-" + ("0" + (date.getMonth() + 1)).slice(-2) +
				"-" + ("0" + date.getDate()).slice(-2);
			log_entry.time = ("0" + date.getHours()).slice(-2) +
				":" + ("0" + date.getMinutes()).slice(-2) +
				":" + ("0" + date.getSeconds()).slice(-2);
			log_entry.milliseconds = ("000" + date.getMilliseconds()).slice(-4);

			// Get the timezone offset.
			var timezone_minutes = date.getTimezoneOffset() % 60;
			var timezone_hours = (date.getTimezoneOffset() - timezone_minutes) / 60;
			log_entry.timezone = ("0" + timezone_hours).slice(-2) + ("0" + timezone_minutes).slice(-2);

			// Get the message severity.
			Severity = Severity || 'INFO';
			log_entry.severity = Severity.substr(0, 1).toUpperCase();
			if (log_entry.severity == 'T')
			{
				log_entry.severity_word = 'TRACE';
			}
			else if (log_entry.severity == 'D')
			{
				log_entry.severity_word = 'DEBUG';
			}
			else if (log_entry.severity == 'I')
			{
				log_entry.severity_word = 'INFO ';
			}
			else if (log_entry.severity == 'W')
			{
				log_entry.severity_word = 'WARN ';
			}
			else if (log_entry.severity == 'E')
			{
				log_entry.severity_word = 'ERROR';
			}
			else if (log_entry.severity == 'F')
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
			Logger.Config.targets.forEach(
				function(log_target)
				{
					if (log_target.log_levels.indexOf(log_entry.severity) >= 0)
					{
						// Construct the output message.
						var out_message = '';
						var left_side = '| ';
						var right_side = ' ';
						if (log_target.output_group && log_entry.group)
						{
							out_message += left_side + log_entry.group + right_side;
						}
						if (log_target.output_date && log_entry.date)
						{
							out_message += left_side + log_entry.date + right_side;
						}
						if (log_target.output_time && log_entry.time)
						{
							out_message += left_side + log_entry.time + right_side;
						}
						if (log_target.output_milliseconds && log_entry.milliseconds)
						{
							out_message += left_side + log_entry.milliseconds + right_side;
						}
						if (log_target.output_timezone && log_entry.timezone)
						{
							out_message += left_side + log_entry.timezone + right_side;
						}
						if (log_target.output_severity_words)
						{
							out_message += left_side + log_entry.severity_word + right_side;
						}
						else if (log_target.output_severity)
						{
							out_message += left_side + log_entry.severity + right_side;
						}
						out_message += left_side + log_entry.message;

						// Add the extra data.
						if (ExtraData)
						{
							out_message += "\n" + JSON.stringify(ExtraData, undefined, "    ");
						}

						// Emit the log entry
						Logger.SendTextToLogTarget(date, out_message, log_target);
					}
				});

			// Return the message.
			return log_entry;
		};


	//=====================================================================
	// Some sugar for declarative functions.
	Logger.LogTrace =
		function LogTrace(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'TRACE', ExtraData);
		};
	Logger.LogDebug =
		function LogDebug(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'DEBUG', ExtraData);
		};
	Logger.LogInfo =
		function LogInfo(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'INFO', ExtraData);
		};
	Logger.LogWarn =
		function LogWarn(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'WARN', ExtraData);
		};
	Logger.LogWarning =
		function LogWarning(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'WARN', ExtraData);
		};
	Logger.LogError =
		function LogError(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'ERROR', ExtraData);
		};
	Logger.LogFatal =
		function LogError(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'FATAL', ExtraData);
		};


	//=====================================================================
	// More sugar for common logger interoperability (e.g. MongoDB.logger)
	Logger.trace =
		function trace(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'TRACE', ExtraData);
		};
	Logger.debug =
		function debug(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'DEBUG', ExtraData);
		};
	Logger.info =
		function info(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'INFO', ExtraData);
		};
	Logger.log =
		function log(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'INFO', ExtraData);
		};
	Logger.warn =
		function warn(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'WARN', ExtraData);
		};
	Logger.warning =
		function warning(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'WARN', ExtraData);
		};
	Logger.error =
		function error(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'ERROR', ExtraData);
		};
	Logger.fatal =
		function fatal(Message, ExtraData)
		{
			Logger.LogMessage(Message, 'FATAL', ExtraData);
		};


	//=====================================================================
	Logger.LogBlankLine =
		function LogBlankLine()
		{
			var date = new Date();
			Logger.Config.targets.forEach(
				function(log_target)
				{
					Logger.SendTextToLogTarget(date, '', log_target);
				});
		};


	//=====================================================================
	Logger.LogSeparatorLine =
		function LogSeparatorLine()
		{
			var date = new Date();
			Logger.Config.targets.forEach(
				function(log_target)
				{
					Logger.SendTextToLogTarget(date, '==========================================', log_target);
				});
		};


	Logger.Config.group = Group || '';
	if (typeof LogDevice != 'undefined')
	{
		Logger.AddLogTarget(LogDevice, LogLevels);
	}

	return Logger;

};


//=====================================================================
// Integrate with the browser environment.
if (typeof window != 'undefined')
{
	window['Logger'] = Logger;
}


//=====================================================================
// Integrate with the nodejs environment.
if (typeof exports != 'undefined')
{
	exports.Logger = Logger;
}
