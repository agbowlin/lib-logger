
# ConsoleLogTarget  Object

The `ConsoleLogTarget` is a type of `LogTarget` object that implements the printing of log messages to the console.


### Constructor

The library function `NewConsoleLogTarget` creates a new instance of a `LogTarget` object.
This function is used internally but can be called if you are supplying your own `LogTarget` implementation.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' ); // Reference the library.
let logger = LIB_LOGGER.NewLogger( 'My Logger' );      // Create a logger object.
let log_target = LIB_LOGGER.NewConsoleLogTarget();     // Create a log target,
logger.AddTarget( log_target );                        // Add log target to logger.
logger.info( 'Hello, World!' );                        // Say something with logger.
```


### Configuration

A `ConsoleLogTarget` stores it configuration information within the `Config.Console` object:

```javascript
Config.Console = {} // There are no configuration options for a ConsoleLogTarget
```


---------------------------------------------------------------------


### ***function***
### OnPrepareLogEntry( LogEntry )

This function is called by `Logger.LogMessage` after it has constructed a `LogEntry` object for the message but before it has constructed the message string that will be printed to the device.

`ConsoleLogTarget` ignores calls to this function.


---------------------------------------------------------------------


### ***function***
### OnRenderLogText( Timestamp, LogEntry, LogText )

This function is a placeholder for specific `LogTargets` to implement.

This function is called after `OnPrepareLogEntry` and after the final message string has been constructed.

`ConsoleLogTarget` prints `LogText` to the console.
