<?php


$Logger = new Logger( null, null, null );


class Logger
{


	//---------------------------------------------------------------------
	public $Config = null;


	//---------------------------------------------------------------------
	function __construct( $Group, $LogDevice, $LogLevels )
	{
		$config = new stdClass();
		$config->group = $Group || '';
		$config->always_use_utc = false;
		$config->targets = [];
		$this->Config = $config;
		if( $LogDevice )
		{
			$this->AddLogTarget( $LogDevice, $LogLevels );
		}
		return;
	}


	//---------------------------------------------------------------------
	public function AddLogTarget( $LogDevice, $LogLevels = null )
	{
		if( !$LogLevels ) { $LogLevels = 'TDIWEF'; }
		$log_target = new stdClass();
		// Output options (all devices)
		$log_target->log_device = $LogDevice;
		$log_target->log_levels = $LogLevels;
		$log_target->output_group = true;
		$log_target->output_date = true;
		$log_target->output_time = true;
		$log_target->output_milliseconds = true;
		$log_target->output_timezone = true;
		$log_target->output_severity = true;
		$log_target->output_severity_words = true;
		// Options for a file device
		$log_target->log_path = '';
		$log_target->log_filename = 'logger';
		$log_target->log_extension = 'log';
		$log_target->use_hourly_logfiles = false;
		$log_target->use_daily_logfiles = false;

		$this->Config->targets []= $log_target;
		return $log_target;
	}


	// //---------------------------------------------------------------------
	// public function GetTimestamp()
	// {
	// 	// The ISO-8601 date (e.g. 2013-05-05T16:34:42+00:00)
	// 	// return date('c');
	// 	$date = date_create();
	// 	$microseconds = microtime();
	// 	$microseconds = substr( $microseconds, 2, 4 );
	// 	$date_format_string = 'Y-m-d H:i:s.'.$microseconds.' O';
	// 	return date_format( $date, $date_format_string );
	// }
	
	
	// //---------------------------------------------------------------------
	// public function SendLogAggregator( $Group, $Level, $Timestamp, $Message )
	// {
	// 	if( !$this->LogAggregateServer ) { return; }
	// 	if( strlen( $this->LogAggregateServer ) == 0 ) { return; }
		
	// 	// $url = 'http://logagg.liquicode.com/submit.php';
	// 	$params = array
	// 			(
	// 				"group"		=> $Group,
	// 				"level"		=> $Level,
	// 				"timestamp"	=> $Timestamp,
	// 				"message"	=> $Message,
	// 			);
		
	// 	foreach( $params as $key => &$val )
	// 	{
	// 		if( is_array( $val ) )
	// 		{
	// 			$val = implode( ',', $val );
	// 		}
	// 		$post_params[] = $key.'='.urlencode( $val );
	// 	}
	// 	$post_string = implode( '&', $post_params );
		
	// 	$parts=parse_url( $this->LogAggregateServer );
		
	// 	$fp = fsockopen( $parts['host'],
	// 					isset( $parts['port']) ? $parts['port'] : 80,
	// 					$errno, $errstr, 30 );
		
	// 	$out = "POST ".$parts['path']." HTTP/1.1\r\n";
	// 	$out.= "Host: ".$parts['host']."\r\n";
	// 	$out.= "Content-Type: application/x-www-form-urlencoded\r\n";
	// 	$out.= "Content-Length: ".strlen( $post_string )."\r\n";
	// 	$out.= "Connection: Close\r\n\r\n";
	// 	if( isset( $post_string ) )
	// 	{
	// 		$out.= $post_string;
	// 	}
		
	// 	fwrite( $fp, $out );
	// 	fclose( $fp );
	// 	return;
	// }
	
	
	//---------------------------------------------------------------------
	public function SendTextToLogTarget( $Timestamp, $Text, $LogTarget )
	{
		if( ($LogTarget->log_device == 'console') || ($LogTarget->log_device == 'stdout') )
		{
			echo $Text."\n";
		}
		elseif( $LogTarget->log_device == 'stderr' )
		{
			echo $Text."\n";
		}
		elseif( $LogTarget->log_device == 'file' )
		{
			$filename = $LogTarget->log_filename;
			if( $LogTarget->log_path )
			{
				$filename = $LogTarget->log_path.'/'.$filename;
			}
			if ($LogTarget->use_hourly_logfiles)
			{
				$filename .= '-'.date_format( $Timestamp, 'Y-m-d-H' );
			}
			else if ($LogTarget->use_daily_logfiles)
			{
				$filename .= '-'.date_format( $Timestamp, 'Y-m-d' );
			}
			if ($LogTarget->log_extension)
			{
				$filename .= '.'.$LogTarget->log_extension;
			}
			file_put_contents( $filename, $Text."\n", FILE_APPEND );
		}
		return;
	}
	
	
	//---------------------------------------------------------------------
	public function LogMessage( $Message, $Severity = null, $ExtraData = null )
	{
		$date = date_create();
		$log_entry = new stdClass();
		
		// Get the message group.
		$log_entry->group = $this->Config->group;

		// Get the message timestamp.
		$log_entry->date = date_format( $date, 'Y-m-d' );
		$log_entry->time = date_format( $date, 'H:i:s' );
		$log_entry->milliseconds = substr( microtime(), 2, 4 );

		// Get the timezone offset.
		$log_entry->timezone = '';

		// Get the message severity.
		if( !$Severity ) { $Severity = 'INFO'; }
		$log_entry->severity = strtoupper( substr( $Severity, 0, 1 ) );

		// Get the log level.
		if    ( $log_entry->severity == 'T' ) { $log_entry->severity_word = 'TRACE'; }
		elseif( $log_entry->severity == 'D' ) { $log_entry->severity_word = 'DEBUG'; }
		elseif( $log_entry->severity == 'I' ) { $log_entry->severity_word = 'INFO '; }
		elseif( $log_entry->severity == 'W' ) { $log_entry->severity_word = 'WARN '; }
		elseif( $log_entry->severity == 'E' ) { $log_entry->severity_word = 'ERROR'; }
		elseif( $log_entry->severity == 'F' ) { $log_entry->severity_word = 'FATAL'; }
		else { $log_entry->severity_word = $Severity; }

		// Get the message.
		$log_entry->message = $Message;

		// Emit the log entry to the targets.
		foreach( $this->Config->targets as $log_target )
		{
			if( stristr( $log_target->log_levels, $log_entry->severity ) )
			{
				// Construct the output message.
				$out_message = '';
				$left_side = '| ';
				$right_side = ' ';
				if( $log_target->output_group && $log_entry->group )
				{
					$out_message .= $left_side.$log_entry->group.$right_side;
				}
				if( $log_target->output_date && $log_entry->date )
				{
					$out_message .= $left_side.$log_entry->date.$right_side;
				}
				if( $log_target->output_time && $log_entry->time )
				{
					$out_message .= $left_side.$log_entry->time.$right_side;
				}
				if( $log_target->output_milliseconds && $log_entry->milliseconds )
				{
					$out_message .= $left_side.$log_entry->milliseconds.$right_side;
				}
				if( $log_target->output_timezone && $log_entry->timezone )
				{
					$out_message .= $left_side.$log_entry->timezone.$right_side;
				}
				if( $log_target->output_severity_words && $log_entry->severity_word )
				{
					$out_message .= $left_side.$log_entry->severity_word.$right_side;
				}
				elseif( $log_target->output_severity )
				{
					$out_message .= $left_side.$log_entry->severity.$right_side;
				}
				$out_message .= $left_side.$log_entry->message;
		
				// Add the extra data.
				if( $ExtraData )
				{
					$out_message .= "\n".json_encode( $ExtraData, JSON_PRETTY_PRINT );
				}
				
				// Emit the log entry.
				$this->SendTextToLogTarget( $date, $out_message, $log_target );
			}
		}

		// Return the message.
		return $log_entry;
	}
	

	//---------------------------------------------------------------------
	public function LogTrace( $Message, $ExtraData = null )
	{
		return $this->LogMessage( $Message, 'TRACE', $ExtraData );
	}
	public function LogDebug( $Message, $ExtraData = null )
	{
		return $this->LogMessage( $Message, 'DEBUG', $ExtraData );
	}
	public function LogInfo( $Message, $ExtraData = null )
	{
		return $this->LogMessage( $Message, 'INFO', $ExtraData );
	}
	public function LogWarn( $Message, $ExtraData = null )
	{
		return $this->LogMessage( $Message, 'WARN', $ExtraData );
	}
	public function LogWarning( $Message, $ExtraData = null )
	{
		return $this->LogMessage( $Message, 'WARN', $ExtraData );
	}
	public function LogError( $Message, $ExtraData = null )
	{
		return $this->LogMessage( $Message, 'ERROR', $ExtraData );
	}


	//---------------------------------------------------------------------
	public function LogBlankLine()
	{
		$date = date_create();
		foreach( $this->Config->targets as $log_target )
		{
			$this->SendTextToLogTarget( $date, '', $log_target );
		}
	}
	public function LogSeparatorLine()
	{
		$date = date_create();
		foreach( $this->Config->targets as $log_target )
		{
			$this->SendTextToLogTarget( $date, '==========================================', $log_target );
		}
	}
	
	
}

