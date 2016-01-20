import { combineReducers } from 'redux';
import {
	SET_NUMBER_ENTRY
} from '../actions/numberentry';
import {
	ADD_PRIME,
	ADD_NON_PRIME,
	ADD_QUEUE_NUMBER,
	REMOVE_QUEUE_NUMBER
} from '../actions/primes';

function numberEntry( state = '', action ) {
	switch ( action.type ) {
		case SET_NUMBER_ENTRY:
			if ( '' === action.number || isNormalInteger( action.number ) ) {
				return action.number;
			} else {
				// Note: Could set an error state here for user validation.
				return state;
			}
		default:
			return state;
	}
}

function isNormalInteger( str ) {
	return /^\+?(0|[1-9]\d*)$/.test( str );
}

const primesInitialState = {
	primes: [],
	nonPrimes: [],
	queue: []
};

function primeState( state = primesInitialState, action ) {
	switch ( action.type ) {
		case ADD_PRIME:
			const primes = [ ...state.primes, action.number ];

			return Object.assign( {}, state, {
				primes
			} );
		case ADD_NON_PRIME:
			const nonPrimes = [ ...state.nonPrimes, action.number ];

			return Object.assign( {}, state, {
				nonPrimes
			} );
		case ADD_QUEUE_NUMBER:
			console.log("queueing number: " + action.number);
			const addedQueue = [ ...state.queue, action.number ];

			return Object.assign( {}, state, {
				queue: addedQueue
			} );
		case REMOVE_QUEUE_NUMBER:
			console.log("unqueuing number: " + action.number);
			const removedQueue = state.queue.filter(
				( num ) => { return num != action.number }
			);

			return Object.assign( {}, state, {
				queue: removedQueue
			} );
		default:
			return state;
	}
}

const rootReducer = combineReducers( {
	numberEntry,
	primeState
} );

export default rootReducer;

