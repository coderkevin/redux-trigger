
const REDUX_TRIGGER_ADD = 'REDUX_TRIGGER_ADD';
const REDUX_TRIGGER_REMOVE = 'REDUX_TRIGGER_REMOVE';

/**
 * Middleware creator.
 */
function createTriggerMiddleware() {
	let triggers = [];

	return ( store ) => ( next ) => ( action ) => {
		switch ( action.type ) {
			case REDUX_TRIGGER_ADD:
				triggers.unshift( action.payload );

				console.log("** redux-trigger add! **");
				console.log( triggers );
				return true;
			case REDUX_TRIGGER_REMOVE:
				triggers.splice( triggers.indexOf( action.payload ), 1 );

				console.log("** redux-trigger remove! **");
				console.log( triggers );
				return true;
			default:
				let res = next( action );
				checkTriggers( store, triggers );
				return res;
		}
	}
}

function checkTriggers( store, triggers ) {
	for ( let index = triggers.length - 1; index >= 0; index-- ) {
		let trigger = triggers[ index ];
		let match = trigger.matcher( store.getState() );

		if ( match ) {
			// Remove the trigger first, so it doesn't get run again.
			triggers.splice( index, 1 );

			// Then dispatch the trigger's action.
			let action = trigger.actionCreator( match );
			store.dispatch( action );
		}
	}
}


/**
 * Convenience function to create a trigger object.
 *
 * @param Function matcher ( state )
 * 	return match object when trigger should fire, or null if no match.
 * @param Function actionCreator ( match )
 *  create action using match object.
 * @return Object The trigger object.
 */
export function createTrigger( matcher, actionCreator ) {
	return {
		matcher,
		actionCreator
	};
}

/**
 * Trigger add action creator.
 *
 * @param Object trigger
 *   The trigger object to be added. Must be in the format:
 *   { matcher, actionCreator }
 * @return Object The trigger action to be dispatched.
 */
export function addTrigger( trigger ) {
	return {
		type: REDUX_TRIGGER_ADD,
		payload: trigger
	};
}

/**
 * Trigger remove action creator.
 *
 * @param Object trigger The trigger object to be removed.
 * @return Object The trigger action to be dispatched.
 */
export function removeTrigger( trigger ) {
	return {
		type: REDUX_TRIGGER_REMOVE,
		payload: trigger
	};
}

export default createTriggerMiddleware;

