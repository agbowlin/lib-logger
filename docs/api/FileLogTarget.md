
# FileLogTarget  Object

The `FileLogTarget` is a type of `LogTarget` object that implements the printing of log messages to a log file.


### Constructor

The library function `NewFileLogTarget` creates a new instance of a `LogTarget` object.
This function is used internally but can be called if you are supplying your own `LogTarget` implementation.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' ); // Reference the library.
let logger = LIB_LOGGER.NewLogger( 'My Logger' );      // Create a logger object.
let log_target = LIB_LOGGER.NewFileLogTarget();        // Create a log target,
logger.AddTarget( log_target );                        // Add log target to logger.
logger.info( 'Hello, World!' );                        // Say something with logger.
```


### Configuration

A `FileLogTarget` stores it configuration information within the `Config.File` object:

```javascript
Config.File = 
{
	LogPath: '',
	LogFilename: 'logger',
	LogExtension: 'log',
	UseHourlyLogFiles: false,
	UseDailyLogFiles: false,
}
```


---------------------------------------------------------------------


### ***function***
### OnPrepareLogEntry( LogEntry )

This function is called by `Logger.LogMessage` after it has constructed a `LogEntry` object for the message but before it has constructed the message string that will be printed to the device.

`FileLogTarget` ignores calls to this function.


---------------------------------------------------------------------


### ***function***
### OnRenderLogText( Timestamp, LogEntry, LogText )

This function is a placeholder for specific `LogTargets` to implement.

This function is called after `OnPrepareLogEntry` and after the final message string has been constructed.

`FileLogTarget` adds the log message text to the configured log file.
