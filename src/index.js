
const REDUX_TRIGGER_ADD = 'REDUX_TRIGGER_ADD';
const REDUX_TRIGGER_CANCEL = 'REDUX_TRIGGER_CANCEL';

/**
 * Middleware creator.
 */
function createTriggerMiddleware() {
	let triggers = [];

	return ( store ) => ( next ) => ( action ) => {
		switch ( action.type ) {
			case REDUX_TRIGGER_ADD:
				triggers.unshift( action.trigger );

				console.log("** redux-trigger add! **");
				console.log( triggers );
				return true;
			case REDUX_TRIGGER_CANCEL:
				triggers.splice( triggers.indexOf( action.trigger ), 1 );

				console.log("** redux-trigger cancel! **");
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
 * Creates an action to add a new trigger.
 *
 * @param Function matcher ( state )
 * 	return match object when trigger should fire, or null if no match.
 * @param Function actionCreator ( match )
 *  create action using match object.
 * @return Object The trigger action to be dispatched.
 */
export function addTrigger( matcher, actionCreator ) {
	return {
		type: REDUX_TRIGGER_ADD,
		trigger: { matcher, actionCreator }
	};
}

/**
 * Creates an action to cancel a trigger.
 *
 * @param Object trigger The trigger object to cancel.
 * @return Object The trigger action to be dispatched.
 */
export function cancelTrigger( trigger ) {
	return {
		type: REDUX_TRIGGER_CANCEL,
		trigger
	};
}

export default createTriggerMiddleware;

