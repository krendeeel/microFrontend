import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

const config = ts.config(js.configs.recommended, ...ts.configs.recommended, {
  plugins: {
    react: reactPlugin,
    prettier: prettierPlugin,
    '@typescript-eslint': ts.plugin,
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefreshPlugin
  },
  rules: {
    ...prettierPlugin.configs.recommended.rules,
    ...prettierConfig.rules,
    'react/jsx-no-target-blank': 'off'
  },
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.es2021
    },
    parserOptions: {
      project: ['tsconfig.json']
    }
  },
  files: ['**/*.{ts,tsx}'],
  ignores: ['node_modules', './dist/**']
});

export default config;
