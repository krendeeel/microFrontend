import path from 'path';
import webpack from 'webpack';
import { BuildMode } from './enums/BuildMode';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export const createBaseConfig = (mode: BuildMode): webpack.Configuration => ({
  mode,
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  output: {
    clean: true,
    publicPath: 'auto',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'build')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
});
