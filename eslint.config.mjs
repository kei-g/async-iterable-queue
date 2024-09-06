import globals from 'globals'
import tslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      'src/**/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      tslint: tslint.plugin,
    },
    rules: {
      complexity: [
        'error',
        4,
      ],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'linebreak-style': [
        'error',
        'unix',
      ],
      'no-control-regex': 'off',
      'no-namespace': 'off',
      'no-unused-vars': [
        'warn',
        {
          'argsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
        },
      ],
      quotes: [
        'error',
        'single',
      ],
      semi: [
        'error',
        'never',
      ],
    }
  }
]
