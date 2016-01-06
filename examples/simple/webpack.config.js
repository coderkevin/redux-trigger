var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./index.jsx'
	],
	output: {
		path: path.join( __dirname, 'dist' ),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [ {
			test: /\.jsx?$/,
			loaders: [ 'babel' ],
			exclude: /node_modules/,
			include: __dirname
		} ]
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'node_modules' ]
	}
};
