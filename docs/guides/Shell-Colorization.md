
# Shell Colorization

This is a submodule containing some constants and a function to assist in coloizing output in a shell terminal window.

The `ShellText` function is used internally by the library but the constants can be used to set the color values in a `ShellLogTarget.Config.Shell` object.

All of these are available from the library:

```javascript
const LIB_LOGGER = require( '@liquicode/lib-logger' );
let Logger = LIB_LOGGER.NewLogger();
let ShellLogTarget = Logger.AddLogTarget( LIB_LOGGER.NewShellLogTarget() );
ShellLogTarget.Config.Shell.TraceColors.Forecolor = LIB_LOGGER.ShellForecolor.LightGray;
ShellLogTarget.Config.Shell.ErrorColors.Forecolor = LIB_LOGGER.ShellForecolor.Red;
```


## ShellBackcolor Constants

```javascript
const ShellBackcolor =
{
	Default: 49,
	Black: 40,
	Red: 41,
	Green: 42,
	Yellow: 43,
	Blue: 44,
	Magenta: 45,
	Cyan: 46,
	LightGray: 47,
	DarkGray: 100,
	LightRed: 101,
	LightGreen: 102,
	LightYellow: 103,
	LightBlue: 104,
	LightMagenta: 105,
	LightCyan: 106,
	White: 107,
};
```

## ShellForecolor Constants

```javascript
const ShellForecolor =
{
	Default: 39,
	Black: 30,
	Red: 31,
	Green: 32,
	Yellow: 33,
	Blue: 34,
	Magenta: 35,
	Cyan: 36,
	LightGray: 37,
	DarkGray: 90,
	LightRed: 91,
	LightGreen: 92,
	LightYellow: 93,
	LightBlue: 94,
	LightMagenta: 95,
	LightCyan: 96,
	White: 97,
};
```

## ShellEffect Constants

```javascript
const ShellEffect =
{
	UnsetAll: 0,
	Bold: 1,
	Dim: 2,
	Underlined: 4,
	Blink: 5,
	Invert: 7,
	Hidden: 8,
	UnsetBold: 21,
	UnsetDim: 22,
	UnsetUnderlined: 24,
	UnsetBlink: 25,
	UnsetInvert: 27,
	UnsetHidden: 28,
};
```


---------------------------------------------------------------------


### ***function***
## ShellText( Text, Backcolor, Forecolor, Effect )

***Overview***

Inserts formatting codes into `Text` and returns a formatted string that can be printed to the console.

***Parameters***

- `Text` (required) : The text to format.
- `Backcolor` (optional) : One of the `ShellBackcolor` values.
- `Forecolor` (optional) : One of the `ShellForecolor` values.
- `Effect` (optional) : One of the `ShellEffect` values.

***Returns***

The formatted text with embedded color codes.

