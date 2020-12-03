
# LogTarget

The `LogTarget` object serves as a base class/object for specfic `LogTarget` implementations.

There is a specific `LogTarget` implementation for each supported log device:

- [ConsoleLogTarget](ConsoleLogTarget.md)
- [ShellLogTarget](ShellLogTarget.md)
- [FileLogTarget](FileLogTarget.md)


## LogTarget Constructor

The library function `NewLogTarget` creates a new instance of a `LogTarget` object.
This function is used internally but can be called if you are supplying your own `LogTarget` implementation.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
let log_target = LIB_LOGGER.NewLogTarget();
```

## LogTarget Fields

A `LogTarget` stores it configuration information within a `Config` object.
Specific `LogTarget` implementations will append their configuration information to the `Config` object as well.

```javascript
Config =
{
	DeviceName: '',              // The name of the device (e.g. console, file).
	LogLevels: '',               // The log message severity flags filter.
	OutputGroup: true,           // Outputs the group name in the log message.
	OutputDate: true,            // Outputs the date (YYY-MM-DD) in the log message.
	OutputTime: true,            // Outputs the time (HH:MM:SS) in the log message.
	OutputMilliseconds: true,    // Outputs the milliseconds in the log message.
	OutputTimezone: true,        // Outputs the timezone in the log message.
	OutputSeverity: true,        // Outputs the severity code in the log message.
	OutputSeverityWord: true,    // Outputs the severity word in the log message.
}
```


---------------------------------------------------------------------


### ***function***
## OnPrepareLogEntry( LogEntry )

This function is a placeholder for specific `LogTargets` to implement.

This function is called by `Logger.LogMessage` after it has constructed a `LogEntry` object for the message but before it has constructed the message string that will be printed to the device.

`LogTarget` implementations can use this function to preprocess the `LogEntry` information.


---------------------------------------------------------------------


### ***function***
## OnRenderLogText( Timestamp, LogEntry, LogText )

This function is a placeholder for specific `LogTargets` to implement.

This function is called after `OnPrepareLogEntry` and after the final message string has been constructed.
`LogTargets` implement this function to render the message string to the underlying device.
For `ConsoleLogTarget`, the string is written to the console.
For `FileLogTarget`, the string is written to the log file.


