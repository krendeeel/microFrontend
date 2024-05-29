import webpack from 'webpack';
import { BuildMode } from './enums/BuildMode';
import { createBaseConfig } from './createBaseConfig';
import type { Configuration } from 'webpack-dev-server';

interface IDevelopmentConfiguration extends webpack.Configuration {
  devServer: Configuration;
}

interface IParams {
  port?: number;
}

export const createDevelopmentConfig = ({ port }: IParams): IDevelopmentConfiguration => {
  const baseConfig = createBaseConfig(BuildMode.DEVELOPMENT);

  baseConfig.plugins?.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'chat',
      filename: 'chat.js',
      exposes: {
        './App': './src/components/App'
      },
      shared: ['react', 'react-dom']
    })
  );

  return {
    ...baseConfig,
    devServer: {
      hot: true,
      port: port ?? 3001,
      // если раздавать статику через nginx То надо делать проксирование на Index.html
      historyApiFallback: true
    }
  };
};
