const path = require('path');
const autoprefixer = require('autoprefixer');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {

  const HOST = process.env.HOST || '0.0.0.0';
  const PORT = process.env.PORT || 3000;
  const ASSET_PATH = process.env.ASSET_PATH || '/';

  const BUILD_FILE_NAMES = {

    // JS.
    jsFileName: env === 'development' ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    jsChunkFileName: env === 'development' ? 'js/[name].chunk.js' : 'js/[id].[contenthash:8].chunk.js',

    // Styles.
    stylesFileName: env === 'development' ? 'styles/[name].css' : 'styles/[name].[contenthash:8].css',
    stylesChunkFileName: env === 'development' ? 'styles/[id].chunk.css' : 'styles/[id].[contenthash:8].chunk.css',

    // Images/Fonts.
    imagesFileName: env === 'development' ? 'images/[name].[ext]' : 'images/[name].[contenthash:8].[ext]',
    fontsFileName: env === 'development' ? 'fonts/[name].[ext]' : 'fonts/[name].[contenthash:8].[ext]',
  };

  const PATHS = {

    // Folders.
    src: path.join(__dirname, 'src'),
    public: path.join(__dirname, 'public'),
    dist: path.join(__dirname, 'dist'),
    node_modules: path.join(__dirname, 'node_modules'),

    // Files.
    entry: path.join(__dirname, 'src', 'index.js'),
    template: path.join(__dirname, 'public', 'index.html'),
    env: path.join(__dirname, '.env'),
  };

  const baseConfig = {
    entry: {
      main: PATHS.entry,
    },
    output: {
      path: PATHS.dist,
      publicPath: ASSET_PATH,
      filename: BUILD_FILE_NAMES.jsFileName,
      chunkFilename: BUILD_FILE_NAMES.jsChunkFileName,
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '@': PATHS.src,
      },
    },
    module: {
      rules: [
        // JavaScript loaders.
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        // Style loaders (loader order matters here).
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: env === 'development',
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([autoprefixer]),
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // Image loaders.
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: BUILD_FILE_NAMES.imagesFileName,
              },
            },
          ],
        },
        // Font loaders.
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: BUILD_FILE_NAMES.fontsFileName,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: BUILD_FILE_NAMES.stylesFileName,
        chunkFilename: BUILD_FILE_NAMES.stylesChunkFileName,
      }),
      new Dotenv({
        path: PATHS.env,
      }),
      new HtmlWebpackPlugin({
        template: PATHS.template,
      }),
      new CopyPlugin([
        {
          from: PATHS.public,
          to: PATHS.dist,
          ignore: ['*.html'],
        },
      ]),
    ],
  };

  const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: PATHS.dist,
      host: HOST,
      port: PORT,
      compress: true,
      hot: true,
      historyApiFallback: true,
      writeToDisk: true,
      stats: 'errors-only',
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  };

  const prodConfig = {
    mode: 'production',
    optimization: {
      minimize: true,
      moduleIds: 'hashed',
      chunkIds: 'named',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            enforce: true,
          },
        },
      },
    },
  };

  return env === 'development'
    ? { ...baseConfig, ...devConfig }
    : { ...baseConfig, ...prodConfig };
};
