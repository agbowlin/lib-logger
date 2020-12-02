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
let NewLogger = require( './Logger.js' ).NewLogger;
let NewShellLogTarget = require( './LogTargets/ShellLogTarget.js' ).NewShellLogTarget;
let NewFileLogTarget = require( './LogTargets/FileLogTarget.js' ).NewFileLogTarget;

// Shell Colors
const LIB_SHELL_COLORS = require( './ShellColors.js' );



//=====================================================================
// Integrate with the browser environment.
if ( typeof window !== 'undefined' )
{
	window[ 'Logger' ] = Logger;
	window[ 'NewLogger' ] = NewLogger;
	window[ 'NewShellLogTarget' ] = NewShellLogTarget;
	window[ 'NewFileLogTarget' ] = NewFileLogTarget;
	window[ 'ShellBackcolor' ] = LIB_SHELL_COLORS.ShellBackcolor;
	window[ 'ShellForecolor' ] = LIB_SHELL_COLORS.ShellForecolor;
	window[ 'ShellEffect' ] = LIB_SHELL_COLORS.ShellEffect;
	window[ 'ShellText' ] = LIB_SHELL_COLORS.ShellText;
}


//=====================================================================
// Integrate with the nodejs environment.
if ( typeof exports !== 'undefined' )
{
	exports.Logger = Logger;
	exports.NewLogger = NewLogger;
	exports.NewShellLogTarget = NewShellLogTarget;
	exports.NewFileLogTarget = NewFileLogTarget;
	exports.ShellBackcolor = LIB_SHELL_COLORS.ShellBackcolor;
	exports.ShellForecolor = LIB_SHELL_COLORS.ShellForecolor;
	exports.ShellEffect = LIB_SHELL_COLORS.ShellEffect;
	exports.ShellText = LIB_SHELL_COLORS.ShellText;
}
