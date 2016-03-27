import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Application from './Application';

const rootComponent =
	<Provider>
		<Application />
	</Provider>;

render( rootComponent, document.getElementById( 'root' ) );

