const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let config = {
	entry: './src/index.tsx',
    resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
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
				test: /\.(ts[x]?)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
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