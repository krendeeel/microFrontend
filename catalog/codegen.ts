import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  watch: true,
  schema: './schema.graphql',
  generates: {
    './src/entities/__generated__/': {
      documents: ['./src/**/*.ts'],
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
