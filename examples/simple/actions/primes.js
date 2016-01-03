
export const ADD_PRIME = 'ADD_PRIME';
export const ADD_NON_PRIME = 'ADD_PRIME';
export const QUEUE_NUMBER = 'QUEUE_NUMBER';

export function addNumber( number ) {
	return {
		type: QUEUE_NUMBER,
		number
	};
}

