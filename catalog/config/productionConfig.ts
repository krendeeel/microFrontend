import webpack from 'webpack';
import { BuildMode } from './enums/BuildMode';
import { createBaseConfig } from './createBaseConfig';

export const createProductionConfig = (): webpack.Configuration => {
  const baseConfig = createBaseConfig(BuildMode.PRODUCTION);

  baseConfig.plugins?.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'catalog',
      filename: 'catalog.js',
      exposes: {
        catalog: './src/app/App'
      },
      shared: ['react', 'react-dom']
    })
  );

  return baseConfig;
};
