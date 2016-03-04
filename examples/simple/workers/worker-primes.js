
console.log( 'worker script executed.' );

addEventListener( 'message', function( evt ) {
	const number = evt.data;
	console.log( 'Checking number' + number );

	postMessage( isPrime( number ) );

	// Our work here is done.
	close();
} );

function isPrime( number ) {
	for ( let i = 2; i < number; i++ ) {
		if ( Number.isInteger( number / i ) ) {
			console.log( number + ' is divisible by ' + i );
			return false;
		}
	}

	// No numbers below this one divided cleanly, it's prime.
	console.log( number + ' is prime.' );
	return true;
}

