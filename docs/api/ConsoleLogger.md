
# ConsoleLogger Object

The `ConsoleLogger` has the same fields and functions as the generic `Logger` object.
It is a `Logger` object that comes preloaded with a `ConsoleLogTarget` and ready for use to send log messages to the console.

See documentation on the [ConsoleLogTarget](api/ConsoleLogTarget.md) object for more information.


### Constructor

The library function `NewConsoleLogger` creates a new instance of a `ConsoleLogger` object.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
let logger = LIB_LOGGER.NewConsoleLogger( 'Group Name' );
logger.info( 'Hello, World!' );
```


### Configuration

Configuration is performed by applying configuration changes to the underlying `ConsoleLogTarget` object:
```javascript
logger.LogTarget[ 0 ].Config.LogLevels = 'TDIWEF';
```
See documentation on the [ConsoleLogTarget](api/ConsoleLogTarget.md) object for more information.


### Fields

The `ConsoleLogger` object has the same fields as the `Logger` object:

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
