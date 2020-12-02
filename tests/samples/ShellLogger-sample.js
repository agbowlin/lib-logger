
//==========================================
// Configure the logging
//==========================================

// Load the library
let LIB_LOGGER = require( '../../src/lib-logger.js' );

// Create a logger object.
let Logger = LIB_LOGGER.NewLogger( 'Test Group' );

// Create a ShellLogTarget object to output to the current shell.
let log_target = LIB_LOGGER.NewShellLogTarget();
log_target.Config.Shell.ColorizeEntireLine = true;
// - colors for trace messages
log_target.Config.Shell.TraceColors.Forecolor = LIB_LOGGER.ShellForecolor.DarkGray;
log_target.Config.Shell.TraceColors.Effect = LIB_LOGGER.ShellEffect.Dim;
// - colors for debug messages
log_target.Config.Shell.DebugColors.Forecolor = LIB_LOGGER.ShellForecolor.DarkGray;
log_target.Config.Shell.DebugColors.Effect = LIB_LOGGER.ShellEffect.Bold;
// - colors for info messages
log_target.Config.Shell.InfoColors.Forecolor = LIB_LOGGER.ShellForecolor.White;
// - colors for warning messages
log_target.Config.Shell.WarnColors.Forecolor = LIB_LOGGER.ShellForecolor.Yellow;
// - colors for error messages
log_target.Config.Shell.ErrorColors.Forecolor = LIB_LOGGER.ShellForecolor.Red;
// - colors for fatal messages
log_target.Config.Shell.FatalColors.Forecolor = LIB_LOGGER.ShellForecolor.Red;
log_target.Config.Shell.FatalColors.Effect = LIB_LOGGER.ShellEffect.Invert;

// Add the LogTarget to the Logger.
Logger.AddLogTarget( log_target );

//==========================================
// Generate some log messages.
//==========================================

require( './sample-log-messages.js' ).EmitMessages( Logger );
