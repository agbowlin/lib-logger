

exports.SampleMessages =
	function SampleMessages( Logger )
	{
		// Get the log target so we can play with it a little.
		let log_target = Logger.LogTargets[ 0 ];

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
		log_target.Config.LogLevels = 'IWE';

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
		log_target.Config.LogLevels = 'TDIWEF';

		log_target.Config.OutputGroup = false;
		log_target.Config.OutputDate = false;
		log_target.Config.OutputTime = false;
		log_target.Config.OutputMilliseconds = false;
		log_target.Config.OutputTimezone = false;
		log_target.Config.OutputSeverity = false;
		log_target.Config.OutputSeverityWord = false;
		Logger.LogInfo( "This message has no annotations." );

		log_target.Config.OutputGroup = true;
		Logger.LogInfo( "This message has: Group." );

		log_target.Config.OutputDate = true;
		Logger.LogInfo( "This message has: Group, Date." );

		log_target.Config.OutputTime = true;
		Logger.LogInfo( "This message has: Group, Date, Time." );

		log_target.Config.OutputMilliseconds = true;
		Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds." );

		log_target.Config.OutputTimezone = true;
		Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds, Timezone." );

		log_target.Config.OutputSeverity = true;
		Logger.LogInfo( "This message has: Group, Date, Time, Milliseconds, Timezone, Severity." );

		log_target.Config.OutputSeverityWord = true;
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

		return;
	};
