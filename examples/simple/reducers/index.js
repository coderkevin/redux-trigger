import { combineReducers } from 'redux';
import {
	SET_NUMBER_ENTRY
} from '../actions/numberentry';
import {
	ADD_PRIME,
	ADD_NON_PRIME,
	QUEUE_NUMBER
} from '../actions/primes';

function numberEntry( state = '', action ) {
	switch ( action.type ) {
		case SET_NUMBER_ENTRY:
			return action.number;
		default:
			return state;
	}
}

const primesInitialState = {
	primes: [],
	nonPrimes: [],
	queue: []
};

function primes( state = primesInitialState, action ) {
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
	numberEntry,
	primes
} );

export default rootReducer;

