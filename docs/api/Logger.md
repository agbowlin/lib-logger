
# Logger Object

The `Logger` object contains the primary interface used to generate log messages.
On it's own, the `Logger` object really doesn't do anything and requires a `LogTarget` to be added to it first.
`Logger` is designed to be a single interface that allows you to interact with multiple `LogTargets`.
Add `LogTargets` to send log messages to various output devices such as the console or a log file.

Convenience constructors exist that will create `Logger` objects preconfigured with a specific `LogTarget`:

- [ConsoleLogger](api/ConsoleLogger.md)
- [ShellLogger](api/ShellLogger.md)
- [FileLogger](api/FileLogger.md)


### Constructor

The library function `NewLogger` creates a new instance of a `Logger` object.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
let logger = LIB_LOGGER.NewLogger( 'Group Name' );
logger.info( 'Hello, World!' );
```


### Configuration

Apart from the two fields listed below, there is no need to configure a `Logger` object.
All configuration is performed on the `LogTargets` added to the `Logger`.

### Fields

- `Group`: The group name provided in the `NewLogger` function.
	The `Group` field can be output with each log message, providing information on the origin of a log message.
- `LogTargets`: An array of `LogTarget` objects.
	Each `LogTarget` is responsible for printing log messages to an actual device.


---------------------------------------------------------------------


### ***function***
## AddLogTarget( LogTarget )

***Overview***

Adds a log target to the `Logger.LogTargets` array.
A `LogTarget` is used to output messages to a specific device (e.g. console, log file).
See [LogTarget](LogTarget.md) for more information.

***Parameters***

- `LogTarget` (required) : The `LogTarget` object to add.

***Returns***

Nothing.


---------------------------------------------------------------------


### ***function***
## LogMessageRaw( Message )

***Overview***

While not specifically designed for application use,
this function is called to send messages directly to the logging engine.
Messages are sent directly to each `LogTarget` in the `Logger.LogTargets` array.
Messages are sent as-is without any of the annotation and formatting found in `LogMessage`.

***Parameters***

- `Message` (required) : The text message to send to the log targets.

***Returns***

Nothing.


---------------------------------------------------------------------


### ***function***
## LogMessage( Message, Severity, ExtraData )

***Overview***

This function is the workhorse of the `Logger` object.
It annotates, formats, and routes log messages to each of the `LogTargets` stored in the `Logger.LogTargets` array.

***Parameters***

- `Message` (required) : The text message to send to the log targets.
- `Severity` (optional) : The severity of the message. Defaults to 'INFO'.
	See [Log Message Severity](LogMessageSeverity.md) for more information.
- `ExtraData` (optional) : An object to be printed out after the message.

***Returns***

The `LogEntry` object detailing the information used to construct the log message text.


---------------------------------------------------------------------


## Convenience Functions

Convenience functions are added to `Logger` to lend some convenience while generating log messages.

- `LogBlankLine()` : Outputs a blank line to the log.
- `LogSeparatorLine()` : Outputs a separator line to the log. A separator line is
	a series of equal '=' signs on the same line. This can help visually group
	together related log lines.

There are functions to send log messages of each severity.

While you are free to call `LogMessage` directly from your application,
these functions can provide a more declarative approach to logging:

- `LogTrace( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'TRACE'.
- `LogDebug( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'DEBUG'.
- `LogInfo( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'INFO'.
- `LogWarn( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'WARN'.
- `LogWarning( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'WARN'.
- `LogError( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'ERROR'.
- `LogFatal( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'FATAL'.

And a more terse version of these same functions:

- `trace( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'TRACE'.
- `debug( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'DEBUG'.
- `info( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'INFO'.
- `warn( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'WARN'.
- `warning( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'WARN'.
- `error( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'ERROR'.
- `fatal( Message, ExtraData )` : Calls `LogMessage` with a `Severity` of 'FATAL'.
