
//==========================================
// Configure the logging
//==========================================

// Load the library
const LIB_LOGGER = require( '../../src/lib-logger.js' );

// Create a logger object.
let Logger = LIB_LOGGER.NewLogger( 'Test Group' );

// Create a ConsoleLogTarget object to output to the console.
let log_target = LIB_LOGGER.NewConsoleLogTarget();

// Add the LogTarget to the Logger.
Logger.AddLogTarget( log_target );

//==========================================
// Generate some log messages.
//==========================================

require( './sample-log-messages.js' ).SampleMessages( Logger );
