
# Logging Techniques

During development, you may want to have only informational message sent to the
console while maintaining a log file containing all log messages. You would
add two log devices and configure the console device to limit the severity of
log messages displayed on it.

```javascript
// A console log target that handles IWEF log messages.
let console_log_target = Logger.AddLogTarget( LIB_LOGGER.NewConsoleLogTarget( 'IWEF' ) );

// A file log target that logs all message types.
let file_log_target = Logger.AddLogTarget( LIB_LOGGER.NewFileLogTarget( 'TDIWEF' ) );

Logger.LogMessage( 'Hello, World!', 'INFO' ); // console and file.
Logger.LogMessage( 'Hello, File!', 'DEBUG' ); // file only, no console!
```

You may want to have log files which contain only error messages. Changes to the
size of this file could be monitored to provide an easy early warning system.

```javascript
// A file log target that logs all message types.
let file_log_target = Logger.AddLogTarget( LIB_LOGGER.NewFileLogTarget( 'TDIWEF' ) );
file_log_target.Config.File.LogFilename = 'logs';

// A file log target that logs only errors.
let error_log_target = Logger.AddLogTarget( LIB_LOGGER.NewFileLogTarget( 'EF' ) );
error_log_target.Config.File.LogFilename = 'errors';

Logger.LogMessage( 'Hello, World!', 'INFO' ); // Everything is fine here, no errors.
Logger.LogMessage( 'My Bad!', 'ERROR' ); // The error log file is updated!
```

To assist in troubleshooting, you may have a daily production log (IWEF) and
more verbose hourly logs (TDIWEF). Given a timestamp of an error or warning from
the production log, you could quickly navigate to the correct hourly log for
further investigation.

```javascript
// A file log target that logs everything but trace and debug messages.
let production_log_target = Logger.AddLogTarget( LIB_LOGGER.NewFileLogTarget( 'IWEF' ) );
production_log_target.Config.File.UseDailyLogFiles = true; // One log file per day

// A file log target that logs all message types.
let debug_log_target = Logger.AddLogTarget( LIB_LOGGER.NewFileLogTarget( 'TDIWEF' ) );
debug_log_target.Config.File.UseHourlyLogFiles = true; // One log file per hour

Logger.LogMessage( 'Hello, World!', 'INFO' ); // An info, available in both targets.
Logger.LogMessage( 'Dump of the foo object:', 'DEBUG', foo ); // Only in the debug target!
```
