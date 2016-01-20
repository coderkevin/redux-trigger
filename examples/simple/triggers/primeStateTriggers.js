// TODO: Switch this out with a proper import from the module when it's ready.
import { addTrigger } from '../../../src';
import { checkNextPrimeAction } from '../middleware/primesMiddleware';

const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';

function queueMatcher( state ) {
	const { queue } = state.primeState;
	console.log('queue');
	console.log(queue);
	return ( queue.length > 0 ? queue : null );
}

export function addQueueTrigger() {
	return addTrigger(
		queueMatcher,
		( match ) => {
			return [
				checkNextPrimeAction(),
				addQueueTrigger(),
			];
		}
	);
}

