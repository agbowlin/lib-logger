//=====================================================================
//=====================================================================
//
//		RedisLogTarget.js
//
//	- A log target which publishes log entries to a redis server.
//
//=====================================================================
//=====================================================================

"use strict";


const LIB_LOG_TARGET = require( './LogTarget.js' );


var LIB_REDIS = null;
try
{
	LIB_REDIS = require( 'redis' );
}
catch ( error ) 
{
	console.error( 'LIB-LOGGER: An npm library required for this log target [RedisLogTarget] was not found.' );
	console.error( 'LIB-LOGGER: The npm library [redis] was not found.' );
	console.error( 'LIB-LOGGER: To install [redis] please use: npm install --save redis' );
	throw error;
}


exports.NewRedisLogTarget =
	function NewRedisLogTarget( LogLevels )
	{
		//---------------------------------------------------------------------
		// Create a new log target object.
		let log_target = LIB_LOG_TARGET.NewLogTarget();

		//---------------------------------------------------------------------
		// LogTarget Config
		log_target.Config.DeviceName = 'redis';
		log_target.Config.LogLevels = LogLevels || 'TDIWEF';

		//---------------------------------------------------------------------
		// RedisLogTarget Config
		log_target.Config.Redis = {
			url: 'redis://localhost:6379',
			channel_name: 'logs',
		};


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
				let channel = LIB_REDIS.createClient( { url: log_target.Config.Redis.url } );
				channel.publish( log_target.Config.Redis.channel_name, JSON.stringify( LogEntry ) );
				channel.quit();
				return;
			};


		//---------------------------------------------------------------------
		// Return the log target object.
		return log_target;
	};
