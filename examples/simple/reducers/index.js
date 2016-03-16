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
	presets: [ '179426447', '179430203', '1299912', '179621987', '677' ],
	primes: [],
	nonPrimes: [],
	queue: []
};

function primeState( state = primesInitialState, action ) {
	switch ( action.type ) {
		case ADD_PRIME:
			const primes = [ ...state.primes ];

			// Only add it to the list if it's not been added before.
			if ( primes.indexOf( action.number ) === -1 ) {
				primes.push( action.number );
			}

			return Object.assign( {}, state, {
				primes
			} );
		case ADD_NON_PRIME:
			const nonPrimes = [ ...state.nonPrimes ];

			// Only add it to the list if it's not been added before.
			if ( nonPrimes.indexOf( action.number ) === -1 ) {
				nonPrimes.push( action.number );
			}

			return Object.assign( {}, state, {
				nonPrimes
			} );
		case ADD_QUEUE_NUMBER:
			const addedQueue = [ ...state.queue ];

			// Only add it to the queue if it's not been added before.
			if ( addedQueue.indexOf( action.number ) === -1 &&
			     state.primes.indexOf( action.number ) === -1 &&
			     state.nonPrimes.indexOf( action.number ) === -1  ) {
				addedQueue.push( action.number );
			}

			return Object.assign( {}, state, {
				queue: addedQueue
			} );
		case REMOVE_QUEUE_NUMBER:
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

