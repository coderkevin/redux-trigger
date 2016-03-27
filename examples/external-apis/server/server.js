/**
 * Simple Redux/React Dev Server
 */
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import express from 'express';
import config from '../webpack.config';

const app = new express();
const port = 3000;
const devConfig = {
	noInfo: true,
	publicPath: config.output.publicPath
};

console.log( 'Starting server.' );

const compiler = webpack( config );
app.use( webpackDevMiddleware( compiler, devConfig ) );

app.get( '/', ( req, res ) => {
	res.sendFile( path.resolve( __dirname, '..', 'app', 'index.html' ) );
} );

app.listen( port, ( error ) => {
	if ( error ) {
		console.error( error );
	} else {
		console.info(
			'Listening on port %s. Open up http://localhost:%s/ in your browser.',
			port,
			port
		);
	}
} );
