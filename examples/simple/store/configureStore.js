import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
// TODO: Move this import to a proper module after it's build.
import createTrigger from '../../../src';
import multi from 'redux-multi';
import createPrimesMiddleware from '../middleware/primesMiddleware';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
	multi,
	createTrigger(),
	createPrimesMiddleware(),
	createLogger()
)( createStore );

export default function configureStore( initialState ) {
	const store = createStoreWithMiddleware( rootReducer, initialState );

	if ( module.hot ) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept( '../reducers', () => {
			const nextRootReducer = require( '../reducers' );
			store.replaceReducer( nextRootReducer );
		} );
	}

	return store;
}

