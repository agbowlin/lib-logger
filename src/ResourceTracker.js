"use strict";


const LIB_OS = require( 'os' );


exports.NewResourceTracker =
	function NewResourceTracker()
	{
		return {

			CpuCount: LIB_OS.cpus().length,
			StartTime: 0,
			StartCpu: 0,
			StartMem: 0,

			nanoseconds2milliseconds:
				function ( nanoseconds )
				{
					if ( Array.isArray( nanoseconds ) )
						return ( ( nanoseconds[ 0 ] * 1000000000 ) + nanoseconds[ 1 ] ) / 1000000;
					else
						return nanoseconds / 1000;
				},

			start:
				function ()
				{
					this.StartTime = process.hrtime();
					this.StartCpu = process.cpuUsage();
					this.StartMem = process.memoryUsage();
					return;
				},

			check:
				function ()
				{
					// Get elapsed time.
					let this_time = process.hrtime( this.StartTime );
					let time_ms = this.nanoseconds2milliseconds( this_time );

					// Get cpu usage.
					let this_cpu = process.cpuUsage( this.StartCpu );
					let cpu_user_ms = this.nanoseconds2milliseconds( this_cpu.user );
					let cpu_system_ms = this.nanoseconds2milliseconds( this_cpu.system );
					let cpu_percent = Math.round( ( ( 100 * ( cpu_user_ms + cpu_system_ms ) ) / time_ms ) / this.CpuCount );

					// Get memory usage.
					let this_mem = process.memoryUsage();
					let mem_bytes = this_mem.heapUsed - this.StartMem.heapUsed;

					// Return summary.
					return {
						time: time_ms,
						cpu: cpu_percent,
						mem: mem_bytes,
					};
				},
		};
	};
