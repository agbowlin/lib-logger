# Log Message Severity

Log messages have a severity associated with them which range from the most
verbose `TRACE` messages to the most urgent `ERROR` and `FATAL` messages.
Each log target in `Logger.LogTargets` has its own `LogLevels` field
which contains one or more of the characters `TDIWEF` and serves as a message
filter for messages handled by that log target.

If the first letter of a message severity (e.g. I for INFO), does not occur within
`LogLevels`, then that message will be ignored by the log target.

The following message severities are supported:

- `TRACE` : Used for tracing the flow of logic within software.
	Trace messages are inserted at function entry and exit points (e.g. 'Starting FooBar() ...'').
	Trace messages are also used to report on the execution of significant logic milestones (e.g. 'Calc completed').
- `DEBUG` : Used to output diagnostic data and program state information to the log.
	This type information is useful for validating and debugging software processes.
	Debug messages will often contain data dumps of some program variables.
	Use the `ExtraData` parameter in any of the Log functions to dump the JSON representation
	of a data object to the log with your `Message`.
- `INFO` : Informational messages regarding the health and processing activity of	software.
	This will typically be the minimum severity set for log messages within	a production environment.
	Typical INFO messages might be:
	'Authenticated user' or 'Completed Item 3 of 61'.
	INFO messages can be used to help analyze and determine the health of a system.
- `WARN` : A warning message indicates an adverse condition exists, yet it does not prevent
	the completion of the task at hand.
	Examples:
		- 'Found multiple contacts for phone number 555-1212.'
		- 'Connection is unavailable, retrying ...'
		- 'Available storage is less than 5%'
- `ERROR` : Errors prevent the software from completing certain tasks successfuly.
	The software may continue to run after an error, however it may be likely to
	continue generating those errors.
- `FATAL` : Fatal errors prevent the software from executing at all. After a fatal
	error, the software should shut down immediately.
