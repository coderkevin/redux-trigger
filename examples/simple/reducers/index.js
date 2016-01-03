import { combineReducers } from 'redux';
import {
	ADD_PRIME,
	ADD_NON_PRIME,
	QUEUE_NUMBER
} from '../actions/primes';

const primesInitialState = {
	primes: [],
	nonPrimes: [],
	queue: []
};

function primesReducer( state = primesInitialState, action ) {
	switch ( action.type ) {
		case ADD_PRIME:
			const primes = [ ...state.primes, action.prime ];

			return Object.assign( {}, state, {
				primes
			} );
		case ADD_NON_PRIME:
			const nonPrimes = [ ...state.nonPrimes, action.nonPrime ];

			return Object.assign( {}, state, {
				nonPrimes
			} );
		case QUEUE_NUMBER:
			const queue = [ ...state.queue, action.number ];

			return Object.assign( {}, state, {
				queue
			} );
		default:
			return state;
	}
}

const rootReducer = combineReducers( {
	primesReducer
} );

export default rootReducer;

