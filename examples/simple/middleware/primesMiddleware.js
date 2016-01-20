import { removeQueueNumber, addPrime, addNonPrime } from '../actions/primes';

export const CHECK_NEXT_PRIME = 'CHECK_NEXT_PRIME';

function createPrimesMiddleware() {
	return ( store ) => ( next ) => ( action ) => {
		switch ( action.type ) {
			case CHECK_NEXT_PRIME:
				const { queue } = store.getState().primeState;
				checkNextPrime( queue, store.dispatch );
				return true;
			default:
				return next( action );
		}
	};
}

function checkNextPrime( queue, dispatch ) {
	if ( queue.length > 0 ) {
		const number = queue[0];
		console.log( 'checking next number ' + number );
		checkPrime( number ).then(
			( isPrime ) => {
				dispatch( removeQueueNumber( number ) );
				if ( isPrime ) {
					console.log( 'number ' + number + ' is prime!' );
					dispatch( addPrime( number ) );
				} else {
					console.log( 'number ' + number + ' is not prime!' );
					dispatch( addNonPrime( number ) );
				}
			}
		);
	}
}

function checkPrime( number ) {
	return new Promise(
		( resolve, reject ) => {

			for ( let i = 2; i < number; i++ ) {
				if ( Number.isInteger( number / i ) ) {
					console.log( number + " is divisible by " + i );
					resolve( false );
				}
			}

			// No numbers below this one divided cleanly, it's prime.
			resolve( true );
		}
	);
}

export function checkNextPrimeAction() {
	return { type: CHECK_NEXT_PRIME };
}

export default createPrimesMiddleware;

