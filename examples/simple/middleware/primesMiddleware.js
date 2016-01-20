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
				if ( isPrime ) {
					console.log( 'number ' + number + ' is prime!' );
					dispatch( addPrime( number ) );
				} else {
					console.log( 'number ' + number + ' is not prime!' );
					dispatch( addNonPrime( number ) );
				}
				dispatch( removeQueueNumber( number ) );
			}
		);
	}
}

function checkPrime( number ) {
	return new Promise(
		( resolve, reject ) => {

			for ( let i = 0; i < number; i++ ) {
				if ( Number.isInteger( number / i ) ) {
					resolve( true );
				}
			}

			// No numbers below this one divided cleanly, it's prime.
			resolve( false );
		}
	);
}

export function checkNextPrimeAction() {
	return { type: CHECK_NEXT_PRIME };
}

export default createPrimesMiddleware;

