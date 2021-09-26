const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let config = {
	entry: './src/index.js',
    resolve: {
		extensions: ['.jsx', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					'style-loader', 'css-loader'
				]
			}
        ]
    }
};

module.exports = (env, argv) => {
	switch (argv.mode) {
		case 'production':
			config.devtool = 'source-map';
			break;
		default:
		case 'development':
			config.mode = 'development';
			config.devtool = 'inline-source-map';
			break;
	}

    return config;
};