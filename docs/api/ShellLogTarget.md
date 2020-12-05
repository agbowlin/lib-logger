
# ShellLogTarget  Object

The `ShellLogTarget` is a type of `LogTarget` object that implements the printing of log messages to the console.


### Constructor

The library function `NewShellLogTarget` creates a new instance of a `LogTarget` object.
This function is used internally but can be called if you are supplying your own `LogTarget` implementation.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' ); // Reference the library.
let logger = LIB_LOGGER.NewLogger( 'My Logger' );      // Create a logger object.
let log_target = LIB_LOGGER.NewShellLogTarget();       // Create a log target,
logger.AddTarget( log_target );                        // Add log target to logger.
logger.info( 'Hello, World!' );                        // Say something with logger.
```


### Configuration

A `ShellLogTarget` stores it configuration information within the `Config.Shell` object:

```javascript
Config.Shell = 
{
	ColorizeEntireLine: false,
	ColorizeSeverity: false,
	ColorizeMessage: false,
	TraceColors: { Backcolor: null, Forecolor: null, Effect: null, },
	DebugColors: { Backcolor: null, Forecolor: null, Effect: null, },
	InfoColors: { Backcolor: null, Forecolor: null, Effect: null, },
	WarnColors: { Backcolor: null, Forecolor: null, Effect: null, },
	ErrorColors: { Backcolor: null, Forecolor: null, Effect: null, },
	FatalColors: { Backcolor: null, Forecolor: null, Effect: null, },
}
```


---------------------------------------------------------------------


### ***function***
### OnPrepareLogEntry( LogEntry )

This function is called by `Logger.LogMessage` after it has constructed a `LogEntry` object for the message but before it has constructed the message string that will be printed to the device.

`ShellLogTarget` uses this function to embed color codes within specific portions of the log message text (i.e. Severity and Message).


---------------------------------------------------------------------


### ***function***
### OnRenderLogText( Timestamp, LogEntry, LogText )

This function is a placeholder for specific `LogTargets` to implement.

This function is called after `OnPrepareLogEntry` and after the final message string has been constructed.

`ShellLogTarget` applies colorization to the entire line if needed and prints the colorized log message text to the shell terminal.
