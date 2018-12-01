var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve('lib'),
        filename: 'SlideshowLight.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                      loader: 'babel-loader',
                      options: {
                        presets: ['react']
                      }
                    }
                  ],
            },
            {
                // Preprocess your css files
                // you can add additional loaders here (e.g. sass/less etc.)
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
              }
        ]
    }
}