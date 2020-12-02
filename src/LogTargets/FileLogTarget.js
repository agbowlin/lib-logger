//=====================================================================
//=====================================================================
//
//		FileLogTarget.js
//
//	- A log target which outputs log entries to a file.
//
//=====================================================================
//=====================================================================

"use strict";


const LIB_LOG_TARGET = require( './LogTarget.js' );

// Attempt to safely get the file system libraries.
var NPM_PATH = null;
try { NPM_PATH = require( 'path' ); } catch ( error ) { }
var NPM_FS = null;
try { NPM_FS = require( 'fs' ); } catch ( error ) { }


exports.NewFileLogTarget =
	function NewFileLogTarget( LogLevels )
	{
		//---------------------------------------------------------------------
		// Create a new log target object.
		let log_target = LIB_LOG_TARGET.NewLogTarget();

		//---------------------------------------------------------------------
		// LogTarget Config
		log_target.Config.DeviceName = 'file';
		log_target.Config.LogLevels = LogLevels || 'TDIWEF';

		//---------------------------------------------------------------------
		// ShellLogTarget Config
		log_target.Config.File = {
			LogPath: '',
			LogFilename: 'logger',
			LogExtension: 'log',
			UseHourlyLogFiles: false,
			UseDailyLogFiles: false,
		};


		//---------------------------------------------------------------------
		function add_line_to_text_file( Path, Filename, Text )
		{
			let filepath = null;
			if ( !NPM_PATH && !NPM_FS ) 
			{
				// Platform: Unsupported (e.g. Browser)
				return;
			}
			if ( NPM_PATH )
			{
				// Platform: NodeJS
				filepath = NPM_PATH.join( Path, Filename );
				// NPM_FS.appendFileSync( filepath, Text + "\n" );
				NPM_FS.appendFile( filepath, Text + "\n" );
			}
			else
			{
				// Platform: Other (e.g. PhantomJS)
				filepath = `${Path}${NPM_FS.separator}${Filename}`;
				NPM_FS.write( filename, Text + "\n", 'a' );
			}
			return;
		}


		//=====================================================================
		//=====================================================================
		//
		//		OnPrepareLogEntry
		//
		//=====================================================================
		//=====================================================================


		log_target.OnPrepareLogEntry =
			( LogEntry ) => 
			{
				return;
			};


		//=====================================================================
		//=====================================================================
		//
		//		OnRenderLogText
		//
		//=====================================================================
		//=====================================================================


		log_target.OnRenderLogText =
			( Timestamp, LogEntry, LogText ) => 
			{
				let filename = log_target.Config.File.LogFilename;
				if ( log_target.Config.File.UseHourlyLogFiles )
				{
					filename += '-' + Timestamp.toISOString().slice( 0, 13 ).replace( /T/g, '-' );
				}
				else if ( log_target.Config.File.UseDailyLogFiles )
				{
					filename += '-' + Timestamp.toISOString().slice( 0, 10 );
				}
				if ( log_target.Config.File.LogExtension )
				{
					filename += '.' + log_target.Config.File.LogExtension;
				}
				add_line_to_text_file( log_target.Config.File.LogPath, filename, LogText );
				return;
			};


		//---------------------------------------------------------------------
		// Return the log target object.
		return log_target;
	};
