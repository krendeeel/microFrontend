import webpack from 'webpack';
import { BuildMode } from './enums/BuildMode';
import { dependencies } from '../package.json';
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
      name: 'host',
      filename: 'main.js',
      remotes: {
        chat: 'chat@http://localhost:3001/chat.js'
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies['react']
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        }
      }
    })
  );

  return {
    ...baseConfig,
    devServer: {
      hot: true,
      port: port ?? 3000,
      // если раздавать статику через nginx То надо делать проксирование на Index.html
      historyApiFallback: true
    }
  };
};
