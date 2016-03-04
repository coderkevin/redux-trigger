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
			// Create a worker to do the actual mathematical operations.
			const worker = new Worker( '/static/worker-primes.js' );

			worker.onmessage = function( evt ) {
				console.log( 'message received from worker.' );
				console.log( evt );
				resolve( evt.data );
			}

			console.log( 'Worker created' );
			console.log( worker );

			worker.postMessage( Number( number ) );
		}
	);
}

export function checkNextPrimeAction() {
	return { type: CHECK_NEXT_PRIME };
}

export default createPrimesMiddleware;

