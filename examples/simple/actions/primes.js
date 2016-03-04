
export const ADD_PRIME = 'ADD_PRIME';
export const ADD_NON_PRIME = 'ADD_NON_PRIME';
export const ADD_QUEUE_NUMBER = 'ADD_QUEUE_NUMBER';
export const REMOVE_QUEUE_NUMBER = 'REMOVE_QUEUE_NUMBER';

export function addQueueNumber( number ) {
	return {
		type: ADD_QUEUE_NUMBER,
		number
	};
}

export function removeQueueNumber( number ) {
	return {
		type: REMOVE_QUEUE_NUMBER,
		number
	};
}

export function addPrime( number ) {
  return {
    type: ADD_PRIME,
    number
  };
}

export function addNonPrime( number ) {
  return {
    type: ADD_NON_PRIME,
    number
  };
}

