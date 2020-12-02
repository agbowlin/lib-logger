
//==========================================
// Configure the logging
//==========================================

// Load the library
let LIB_LOGGER = require( '../../src/lib-logger.js' );

// Create a logger object.
let Logger = LIB_LOGGER.NewLogger( 'Test Group' );

// Create a ShellLogTarget object to output to the current shell.
let shell_log_target = LIB_LOGGER.NewShellLogTarget();
shell_log_target.Config.Shell.ColorizeEntireLine = true;
shell_log_target.Config.Shell.TraceColors.Forecolor = LIB_LOGGER.ShellForecolor.DarkGray;
shell_log_target.Config.Shell.TraceColors.Effect = LIB_LOGGER.ShellEffect.Dim;
shell_log_target.Config.Shell.DebugColors.Forecolor = LIB_LOGGER.ShellForecolor.DarkGray;
shell_log_target.Config.Shell.DebugColors.Effect = LIB_LOGGER.ShellEffect.Bold;
shell_log_target.Config.Shell.InfoColors.Forecolor = LIB_LOGGER.ShellForecolor.White;
shell_log_target.Config.Shell.WarnColors.Forecolor = LIB_LOGGER.ShellForecolor.Yellow;
shell_log_target.Config.Shell.ErrorColors.Forecolor = LIB_LOGGER.ShellForecolor.Red;
shell_log_target.Config.Shell.FatalColors.Forecolor = LIB_LOGGER.ShellForecolor.Red;
shell_log_target.Config.Shell.FatalColors.Effect = LIB_LOGGER.ShellEffect.Invert;

// Add the LogTarget to the Logger.
Logger.AddLogTarget( shell_log_target );

//==========================================
// Generate some log messages.
//==========================================

Logger.LogTrace( "This is a Trace message." );
Logger.LogDebug( "This is a Debug message." );
Logger.LogInfo( "This is an Info message." );
Logger.LogWarning( "This is a Warn message." );
Logger.LogError( "This is an Error message." );
Logger.LogFatal( "This is a Fatal message." );

//==========================================
Logger.LogSeparatorLine();
shell_log_target.Config.LogLevels = 'IWE';

Logger.LogTrace( "This is a Trace message. SHOULD NOT SEE THIS MESSAGE." );
Logger.LogDebug( "This is a Debug message. SHOULD NOT SEE THIS MESSAGE." );
Logger.LogInfo( "This is an Info message." );
Logger.LogWarning( "This is a Warn message." );
Logger.LogError( "This is an Error message." );
Logger.LogFatal( "This is a Fatal message. SHOULD NOT SEE THIS MESSAGE." );

//==========================================
Logger.LogSeparatorLine();
let obj = {
	Field1: 'Foo',
	Field2: 'Bar'
};
Logger.LogInfo( "Here is some extra data:", obj );

//==========================================
Logger.LogSeparatorLine();
shell_log_target.Config.LogLevels = 'TDIWEF';

shell_log_target.Config.OutputGroup = false;
shell_log_target.Config.OutputDate = false;
shell_log_target.Config.OutputTime = false;
shell_log_target.Config.OutputMilliseconds = false;
shell_log_target.Config.OutputTimezone = false;
shell_log_target.Config.OutputSeverity = false;
shell_log_target.Config.OutputSeverityWord = false;
Logger.LogInfo( "This message has no annotations." );

shell_log_target.Config.OutputGroup = true;
Logger.LogInfo( "This message has: Group." );

shell_log_target.Config.OutputDate = true;
Logger.LogInfo( "This message has: Group, Date." );

shell_log_target.Config.OutputTime = true;
Logger.LogInfo( "This message has: Group, Date, Time." );

shell_log_target.Config.OutputMilliseconds = true;
Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds." );

shell_log_target.Config.OutputTimezone = true;
Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds, Timezone." );

shell_log_target.Config.OutputSeverity = true;
Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds, Timezone, Severity." );

shell_log_target.Config.OutputSeverityWord = true;
Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds, Timezone, Severity Words." );

//==========================================
Logger.LogSeparatorLine();
try
{
	throw "This is a thrown exception!";
}
catch ( exception )
{
	Logger.LogError( exception, exception );
}

//==========================================
Logger.LogSeparatorLine();
Logger.LogInfo( "Its all good, exiting now." );

