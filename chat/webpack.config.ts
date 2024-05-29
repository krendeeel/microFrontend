import { BuildMode } from './config/enums/BuildMode';
import { createProductionConfig } from './config/productionConfig';
import { createDevelopmentConfig } from './config/developmentConfig';

interface EnvVariables {
  port?: number;
  mode: BuildMode;
}

export default (env: EnvVariables) => {
  if (env.mode === BuildMode.PRODUCTION) {
    return createProductionConfig();
  }

  return createDevelopmentConfig({ port: env.port });
};
