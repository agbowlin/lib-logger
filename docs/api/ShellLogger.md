
# ShellLogger Object

The `ShellLogger` has the same fields and functions as the generic `Logger` object.
It is a `Logger` object that comes preloaded with a `ShellLogTarget` and ready for use to send log messages to the shell terminal.


### Constructor

The library function `NewShellLogger` creates a new instance of a `ShellLogger` object.

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
let logger = LIB_LOGGER.NewShellLogger( 'Group Name' );
logger.info( 'Hello, World!' );
```


### Configuration

Configuration is performed by applying configuration changes to the underlying `ShellLogTarget` object:
```javascript
logger.LogTarget[ 0 ].Config.Shell.ColorizeEntireLine = true;
```
See documentation on the [ShellLogTarget](api/ShellLogTarget.md) object for more information.


### Fields

The `ShellLogger` object has the same fields as the `Logger` object:

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
