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
        './App': './src/app/App'
      },
      shared: {
        react: {
          requiredVersion: '18.3.1',
          singleton: true,
          eager: true
        },
        'react-dom': {
          requiredVersion: '18.3.1',
          singleton: true,
          eager: true
        }
      }
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
