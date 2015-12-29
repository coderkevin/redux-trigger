/**
 * Sample Redux/React Server.
 */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import config from './webpack.config';

const app = new express();
const port = 3000;
const devConfig = {
	noInfo: true,
	publicPath: config.output.publicPath
};

console.log( 'Starting server.' );

var compiler = webpack( config );
app.use( webpackDevMiddleware( compiler, devConfig ) );
app.use( webpackHotMiddleware( compiler ) );

app.get( '/', function( req, res ) {
	res.sendFile( __dirname + '/index.html' );
} );

app.listen( port, function( error ) {
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
