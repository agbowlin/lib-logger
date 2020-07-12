<!-- guides/about.md -->



lib-logger
==========================================

An easy logging system implemented for various platforms.


Installation
------------------------------------------

Traditional installation for server-side platforms (nodejs/phantomjs)
```
npm install @liquicode/lib-logger
```
or: Traditional installation for client-side platforms (browser)
```
<bower install not yet supported>
```
or: Clone the source code
```
git clone https://github.com/agbowlin/lib-logger.git
```
or: Download the source code
```
https://github.com/agbowlin/lib-logger/archive/master.zip
```

Logger source files will be located within the platform specific subfolders
of the installation (e.g. js/, php/).
Samples for each platform can also be found underneath these subfolders.


Getting Started
------------------------------------------

### Javascript: Browser (client)
```
// logger.js in installed via 'bower install liqui-logger'
var Logger = require('bower_components/liqui-logger/js/logger').Logger();
Logger.AddLogTarget( 'console' );
Logger.LogMessage( 'Hello, World!' );
```

### Javascript: NodeJS and PhantomJS
```
// logger.js in installed via 'npm install liqui-logger'
var Logger = require( 'liqui-logger/js/logger' ).Logger();
Logger.AddLogTarget( 'console' );
Logger.LogMessage( 'Hello, World!' );
```
In javascript you can create a new Log Target by providing a Log Group, Log Target,
and message severity flags within the constructor:
```
var Logger = require( 'liqui-logger/js/logger' ).Logger( 'My Group', 'console', 'TDIWEF' );
Logger.LogMessage( 'Hello, My Logs!' );
```

### PHP
```
// logger.php is copied manually into the project folder.
require_once( 'logger.php' );
$Logger->AddLogTarget( 'console' );
$Logger->LogMessage( 'Hello, World!' );
```
In PHP you can create a new Log Target by providing a Log Group, Log Target,
and message severity flags within the constructor:
```
require_once( 'logger.php' );
$MyLogger = new Logger( 'My Group', 'console', 'TDIWEF' );
$MyLogger->LogMessage( 'Hello, My Logs!' );
```


Sample Output
------------------------------------------

```
    group         date         time     ms   severity  message
      |            |            |       |       |         |
      v            v            v       v       v         v
==========================================
| Test Group | 2017-01-12 | 03:42:37 | 1547 | TRACE | This is a Trace message.
| Test Group | 2017-01-12 | 03:42:37 | 1548 | DEBUG | This is a Debug message.
| Test Group | 2017-01-12 | 03:42:37 | 1549 | INFO  | This is an Info message.
| Test Group | 2017-01-12 | 03:42:37 | 1551 | WARN  | This is a Warn message.
| Test Group | 2017-01-12 | 03:42:37 | 1552 | ERROR | This is an Error message.
==========================================
| Test Group | 2017-01-12 | 03:42:37 | 1559 | INFO  | Here is some extra data:
{
    "Field1": "Foo",             <--- extra data
    "Field2": "Bar"
}
==========================================      <--- separator line
```


Supported Platforms
------------------------------------------

Logger is available for several platforms.
Pains have been taken to make the api consistent between platform implementations.

Supported platforms:
- PHP
- Javascipt
	- Browser
	- NodeJS
	- PhantomJS


Logger Configuration
------------------------------------------

Logger configuration is stored in the Logger.Config object.
This object has the following properties:

- `group` : Text to display in the Group column of log output.
- `always_use_utc` : (not yet implemented)
- `targets` : An array of log targets. All messages sent to the Logger are
	sent to all log targets. See the ***Log Devices*** section for more information.


Logger Functions
------------------------------------------

### Configuration
- `AddLogTarget(LogDevice, LogLevels)` : Adds a new log target to the `Logger.Config.targets` array.
	See the ***Log Targets*** section for more information.
	- `LogDevice` (required) : The log device to be added (e.g. console, file).
		See the ***Log Devices*** section for more information.
	- `LogLevels` (optional) : A severity filter to be appplied to this log target.
		The default value is 'TDIWEF' which will output messages of any severity.
		See the ***Log Levels and Message Severity*** section for more information.

### Logging Functions
- `LogMessage(Message, Severity, ExtraData)` : This function formats and routes
	the message to each eligible log target in the `Logger.Config.targets` array.
	- `Message` (required) : The text message to send to the log targets.
		This will be formatted according to each log target's configuration.
	- `Severity` (optional) : The severity of the message.
		This defaults to 'INFO'.
	- `ExtraData` (optional) : If present, this parameter will be JSON encoded and
		output into subsequent lines of the log.
- `LogBlankLine()` : Outputs a blank line to the log. Sometimes you just need a blank line.
- `LogSeparatorLine()` : Outputs a separator line to the log. A separator line is
	a series of equal '=' signs on the same line. This can help visually group
	together related log lines.

### Convenience Functions
- `LogTrace(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'TRACE'.
- `LogDebug(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'DEBUG'.
- `LogInfo(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'INFO'.
- `LogWarn(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'WARN'.
- `LogWarning(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'WARN'.
- `LogError(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'ERROR'.
- `LogFatal(Message, ExtraData)` : Calls `LogMessage` with a `Severity` of 'FATAL'.


Log Levels and Message Severity
------------------------------------------

Log messages have a severity associated with them which range from the most
verbose 'TRACE' messages to the most urgent 'ERROR' and 'FATAL' messages.
Each log target in `Logger.Config.targets` has its own `log_levels` field
which contains one or more of the characters 'TDIWEF' and serves as a message
filter for that log target.
If the first letter of a message severity (e.g. I for INFO), does not occur within
`log_levels`, then that message will be ignored by that log target.

The following message severities are supported:
- TRACE : Used for tracing the flow of logic within software.
	Trace messages are inserted at function entry and exit points (e.g. 'Starting FooBar() ...'').
	Trace messages are also used to report on the execution of significant logic milestones (e.g. 'Calc completed').
- DEBUG : Used to output diagnostic data and program state information to the log.
	This type information is useful for validating and debugging software processes.
	Debug messages will often contain data dumps of some program variables.
	Use the `ExtraData` parameter in any of the Log functions to dump the JSON representation
	of a data object to the log with your `Message`.
- INFO : Informational messages regarding the health and processing activity of	software.
	This will typically be the minimum severity set for log messages within	a production environment.
	Typical INFO messages might be:
	'Authenticated user' or 'Completed Item 3 of 61'.
	INFO messages can be used to help analyze and determine the health of a system.
- WARN : A warning message indicates an adverse condition exists, yet it does not prevent
	the completion of the task at hand.
	Examples:
		- 'Found multiple contacts for phone number 555-1212.'
		- 'Connection is unavailable, retrying ...'
		- 'Available storage is less than 5%'
- ERROR : Errors prevent the software from completing certain tasks successfuly.
	The software may continue to run after an error, however it may be likely to
	continue generating those errors.
- FATAL : Fatal errors prevent the software from executing at all. After a fatal
	error, the software should shut down immediately.

### Logging Strategies

During development, you may want to have only informational message sent to the
console while maintaining a log file containing all log messages. You would
add two log devices and configure the console device to limit the severity of
log messages displayed on it.
```
var console_log_target = Logger.AddLogTarget('console', 'IWEF'); // Only IWEF messages for the console.
var file_log_target = Logger.AddLogTarget('file', 'TDIWEF'); // All messages for the file.
Logger.LogMessage( 'Hello, World!', 'INFO' ); // console and file.
Logger.LogMessage( 'Hello, File!', 'DEBUG' ); // file only, no console!
```

You may want to have log files which contain only error messages. Changes to the
size of this file could be monitored to provide an easy early warning system.
```
var file_log_target = Logger.AddLogTarget('file', 'TDIWEF'); // All messages for this file.
var error_log_target = Logger.AddLogTarget('file', 'EF'); // Only the bad stuff for this file.
Logger.LogMessage( 'Hello, World!', 'INFO' ); // Everything is fine here, no errors.
Logger.LogMessage( 'My Bad!', 'ERROR' ); // The error log file is updated!
```

To assist in troubleshooting, you may have a daily production log (IWEF) and
more verbose hourly logs (TDIWEF). Given a timestamp of an error or warning from
the production log, you could quickly navigate to the correct hourly log for
further investigation.
```
var production_log_target = Logger.AddLogTarget('file', 'IWEF');
production_log_target.use_daily_logfiles = true; // One log file per day

var debug_log_target = Logger.AddLogTarget('file', 'TDIWEF');
debug_log_target.use_hourly_logfiles = true; // One log file per hour

Logger.LogMessage( 'Hello, World!', 'INFO' ); // Just the facts, available in both targets.
Logger.LogMessage( 'Dump of the foo object:', 'DEBUG', foo ); // Only in the debug target!
```


Log Targets
------------------------------------------

The following fields are available for all log devices.
```
log_device: ''
log_levels: ''
output_group: true,
output_date: true,
output_time: true,
output_milliseconds: true,
output_timezone: true,
output_severity: true,
output_severity_words: true,
```


Log Devices
------------------------------------------

Each log target identifies a log device

### Console

```
log_device: 'console'
log_device: 'stdout'
log_device: 'stderr'
```

### File


```
log_device: 'file',
log_path: 'path/to/logs',
log_filename: 'filename',
log_extension: 'log',
use_hourly_logfiles: true,
use_daily_logfiles: true
```


Examples
------------------------------------------


### PHP

```
// Create the Logger object.
require_once( 'node_modules/liqui-logger/php/logger.php' );
//or: require_once( 'bower/liqui-logger/php/logger.php' );
//or local copy: require_once( 'logger.php' );

// Set a group name. (optional)
$Logger->Config->group = 'My App';

// Add a log target. (required)
$console_log_target = $Logger->AddLogTarget( 'console' );

// Configure this log target to be a bit less verbose.
$console_log_target->output_date = false;
$console_log_target->output_timezone = false;


```


