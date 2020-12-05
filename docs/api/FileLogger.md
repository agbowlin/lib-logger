
# FileLogger Object

The `FileLogger` has the same fields and functions as the generic `Logger` object.
It is a `Logger` object that comes preloaded with a `FileLogTarget` and ready for use to send log messages to the shell terminal.


### Constructor

The library function `NewFileLogger` creates a new instance of a `FileLogger` object.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
let logger = LIB_LOGGER.NewFileLogger( 'Group Name' );
logger.info( 'Hello, World!' );
```


### Configuration

Configuration is performed by applying configuration changes to the underlying `FileLogTarget` object:
```javascript
logger.LogTarget[ 0 ].Config.File.LogFilename = 'logz';
```
See documentation on the [FileLogTarget](api/FileLogTarget.md) object for more information.


### Fields

The `FileLogger` object has the same fields as the `Logger` object:

- `Group`
- `LogTargets`

See documentation on the [Logger](api/Logger.md) object for more information.


### Functions

The `ConsoleLogger` object has the same function as the `Logger` object:

- AddLogTarget( LogTarget )
- LogMessageRaw( Message )
- LogMessage( Message, Severity, ExtraData )
- LogBlankLine()
- LogSeparatorLine()
- LogTrace( Message, ExtraData )
- LogDebug( Message, ExtraData )
- LogInfo( Message, ExtraData )
- LogWarn( Message, ExtraData )
- LogWarning( Message, ExtraData )
- LogError( Message, ExtraData )
- LogFatal( Message, ExtraData )
- trace( Message, ExtraData )
- debug( Message, ExtraData )
- info( Message, ExtraData )
- warn( Message, ExtraData )
- warning( Message, ExtraData )
- error( Message, ExtraData )
- fatal( Message, ExtraData )

See documentation on the [Logger](api/Logger.md) object for more information.
