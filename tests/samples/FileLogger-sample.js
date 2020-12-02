
//==========================================
// Configure the logging
//==========================================

// Load the library
let LIB_LOGGER = require( '../../src/lib-logger.js' );

// Create a logger object.
let Logger = LIB_LOGGER.NewLogger( 'Test Group' );

// Create a ShellLogTarget object to output to the current shell.
let log_target = LIB_LOGGER.NewFileLogTarget();
log_target.Config.File.LogFilename = 'FileLogger-sample';
log_target.Config.File.UseDailyLogFiles = true;

// Add the LogTarget to the Logger.
Logger.AddLogTarget( log_target );

//==========================================
// Generate some log messages.
//==========================================

require( './sample-log-messages.js' ).EmitMessages( Logger );
