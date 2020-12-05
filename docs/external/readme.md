

# lib-logger (v0.2.3)

An easy and flexible logging system. Log to console, files, etc. Now with colors!


---------------------------------------------------------------------


## Getting Started

### Installation

Traditional installation for server-side platforms (nodejs/phantomjs)

```bash
npm install @liquicode/lib-logger
```

or: Traditional installation for client-side platforms (browser)

```bash
<bower install not yet supported>
```

or: Clone the source code

```bash
git clone https://github.com/agbowlin/lib-logger.git
```

or: Download the latest source code

```bash
https://github.com/agbowlin/lib-logger/archive/master.zip
```


### Referencing the Library

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
```

From the library reference `LIB_LOGGER`, you can create specific loggers for
different output devices or a generalized logger to render log messages on
multiple devices.


### Supported Platforms

`lib-logger` works with several platforms.

- Browser
- NodeJS
- PhantomJS


---------------------------------------------------------------------


## Simple Usage

### In NodeJS

```javascript
// Reference the library.
const LIB_LOGGER = require( '@liquicode/lib-logger' );

// Call NewShellLogger() to get a logger object that prints message to the console.
let Logger = LIB_LOGGER.NewShellLogger( 'Test Group' );

// Log something
Logger.LogInfo( 'Hello, World!' );
```

### In the Browser (client)

```javascript
// Reference the library.
// (installed via 'bower install liqui-logger' ?)
const LIB_LOGGER = require('bower_components/liqui-logger/js/logger');

// Call NewConsoleLogger() to get a logger object that prints message to the console.
let Logger = LIB_LOGGER.NewConsoleLogger( 'Test Group' );

// Log something
Logger.LogInfo( 'Hello, World!' );
Logger.info( 'Hello, Again!' );
```


---------------------------------------------------------------------


## Sample Output

Typical log output, also showing the various parts of a log message:

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

Colorized log output using a `ShellLogTarget`:

![ShellLogTarget colorized output](http://lib-logger.liquicode.com/media/logger-color-output.png)


---------------------------------------------------------------------


## Links to More

- [Source Code](https://github.com/agbowlin/lib-logger)
- [Documentation](http://lib-logger.liquicode.com)
- [NPM Registry](https://www.npmjs.com/package/@liquicode/lib-logger)

