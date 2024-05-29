import webpack from 'webpack';
import { BuildMode } from './enums/BuildMode';
import { dependencies } from '../package.json';
import { createBaseConfig } from './createBaseConfig';

export const createProductionConfig = (): webpack.Configuration => {
  const baseConfig = createBaseConfig(BuildMode.PRODUCTION);

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

  return baseConfig;
};
