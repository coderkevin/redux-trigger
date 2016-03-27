var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		'hot-middleware': 'webpack-hot-middleware/client',
		'bundle': './app/index.jsx'
	},
	output: {
		path: path.join( __dirname, 'dist' ),
		filename: '[name].js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'babel' ],
				include: [ path.resolve( __dirname, 'app' ) ]
			}
		]
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'node_modules' ]
	}
};
