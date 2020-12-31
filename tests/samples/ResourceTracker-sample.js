
const LIB_LOGGER = require( '../../src/lib-logger.js' );

( async () =>
{

	let op1 = LIB_LOGGER.NewResourceTracker();
	let increment = 10000;
	let count = increment;
	while ( true )
	{
		op1.start();
		// let a = new Array( count ).fill( "Hello!" ).reverse();
		let a = [];
		for ( let index = 0; index < count; index++ )
		{
			a.push( `number: ${index + 1}` );
		}
		a = a.reverse();
		let res = op1.check();
		let x = a[ 0 ]; // to keep `a` in scope.
		res.time = res.time.toFixed( 6 );
		console.log( `${res.time}\t${res.cpu}\t${res.mem}` );
		count += increment;
		await new Promise( ( resolve ) => setTimeout( () => resolve(), 100 ) );
	}

} )();

