<?php


require_once( '../logger.php' );

$console_log_target = $Logger->AddLogTarget('console');
$file_log_target = $Logger->AddLogTarget('file');

$Logger->Config->group = 'lorem';

$Logger->LogMessage( "This is make-lorem-logs.php" );
$Logger->LogMessage( "I will make the logs." );

while( true )
{
	$sleep_delay = rand( 1, 20 ) / 10;
	$Logger->LogTrace( 'Sleeping for '.$sleep_delay.' seconds.' );
	sleep( $sleep_delay );
	
	$count = rand( 1, 10 );
	$Logger->LogTrace( 'Generating '.$count.' log items.' );
	
	for( $index = 1; $index <= $count; $index++ )
	{
		$content = file_get_contents( 'http://loripsum.net/api/short/headers/plaintext/prude/1' );
		$ich = strpos( $content, "\n" );
		$content = substr( $content, 0, $ich );
		$Logger->LogMessage( $content.' ('.$index.' of '.$count.')' );
	}
	
	
}

