//=====================================================================
//=====================================================================
//
//		Logger.js
//
//=====================================================================
//=====================================================================

"use strict";

// API v0.1.x
let Logger = require( './Logger.0.1.x.js' ).Logger;

// New API

// - Logger
let NewLogger = require( './Logger.js' ).NewLogger;

// - Log Targets
let NewConsoleLogTarget = require( './LogTargets/ConsoleLogTarget.js' ).NewConsoleLogTarget;
let NewShellLogTarget = require( './LogTargets/ShellLogTarget.js' ).NewShellLogTarget;
let NewFileLogTarget = require( './LogTargets/FileLogTarget.js' ).NewFileLogTarget;
let NewRedisLogTarget = require( './LogTargets/RedisLogTarget.js' ).NewRedisLogTarget;

// - Loggers
let NewConsoleLogger = ( LogLevels ) => NewLogger( NewConsoleLogTarget( LogLevels ) );
let NewShellLogger = ( LogLevels ) => NewLogger( NewShellLogTarget( LogLevels ) );
let NewFileLogger = ( LogLevels ) => NewLogger( NewFileLogTarget( LogLevels ) );

// Shell Colors
const LIB_SHELL_COLORS = require( './ShellColors.js' );

// Resource Tracker
const LIB_RESOURCE_TRACKER = require( './ResourceTracker.js' );


//=====================================================================
// Integrate with the browser environment.
if ( typeof window !== 'undefined' )
{
	window[ 'Logger' ] = Logger;
	window[ 'NewLogger' ] = NewLogger;
	window[ 'NewConsoleLogTarget' ] = NewConsoleLogTarget;
	window[ 'NewShellLogTarget' ] = NewShellLogTarget;
	window[ 'NewFileLogTarget' ] = NewFileLogTarget;
	window[ 'NewRedisLogTarget' ] = NewRedisLogTarget;
	window[ 'NewConsoleLogger' ] = NewConsoleLogger;
	window[ 'NewShellLogger' ] = NewShellLogger;
	window[ 'NewFileLogger' ] = NewFileLogger;
	window[ 'ShellBackcolor' ] = LIB_SHELL_COLORS.ShellBackcolor;
	window[ 'ShellForecolor' ] = LIB_SHELL_COLORS.ShellForecolor;
	window[ 'ShellEffect' ] = LIB_SHELL_COLORS.ShellEffect;
	window[ 'ShellText' ] = LIB_SHELL_COLORS.ShellText;
	window[ 'NewResourceTracker' ] = LIB_RESOURCE_TRACKER.NewResourceTracker;
}


//=====================================================================
// Integrate with the nodejs environment.
if ( typeof exports !== 'undefined' )
{
	exports.Logger = Logger;
	exports.NewLogger = NewLogger;
	exports.NewConsoleLogTarget = NewConsoleLogTarget;
	exports.NewShellLogTarget = NewShellLogTarget;
	exports.NewFileLogTarget = NewFileLogTarget;
	exports.NewRedisLogTarget = NewRedisLogTarget;
	exports.NewConsoleLogger = NewConsoleLogger;
	exports.NewShellLogger = NewShellLogger;
	exports.NewFileLogger = NewFileLogger;
	exports.ShellBackcolor = LIB_SHELL_COLORS.ShellBackcolor;
	exports.ShellForecolor = LIB_SHELL_COLORS.ShellForecolor;
	exports.ShellEffect = LIB_SHELL_COLORS.ShellEffect;
	exports.ShellText = LIB_SHELL_COLORS.ShellText;
	exports.NewResourceTracker = LIB_RESOURCE_TRACKER.NewResourceTracker;
}
