import { removeQueueNumber, addPrime, addNonPrime } from '../actions/primes';

export const CHECK_PRIMES = 'CHECK_PRIMES';

let workers = {};

function createPrimesMiddleware() {
	return ( store ) => ( next ) => ( action ) => {

		switch ( action.type ) {
			case CHECK_PRIMES:
				const { queue } = store.getState().primeState;
				checkPrimes( queue, store.dispatch );
				return true;
			default:
				return next( action );
		}
	};
}

function checkPrimes( queue, dispatch ) {
	if ( queue.length > 0 ) {

		queue.forEach( ( number ) => {
			if ( ! workers[ number ] ) {
				checkPrime( number ).then(
					( isPrime ) => {
						dispatch( removeQueueNumber( number ) );
						if ( isPrime ) {
							dispatch( addPrime( number ) );
						} else {
							dispatch( addNonPrime( number ) );
						}
					}
				);
			}
		}	);

		const number = queue[0];
	}
}

function checkPrime( number ) {

	return new Promise(
		( resolve, reject ) => {
			// Create a worker to do the actual mathematical operations.
			const worker = new Worker( '/static/worker-primes.js' );
			workers[ number ] = worker;

			worker.onmessage = function( evt ) {
				// Got the result back from the worker, clean up and resolve.
				const isPrime = evt.data;
				delete workers[ number ];
				resolve( isPrime );
			}

			worker.postMessage( Number( number ) );
		}
	);
}

export function checkPrimesAction() {
	return { type: CHECK_PRIMES };
}

export default createPrimesMiddleware;

