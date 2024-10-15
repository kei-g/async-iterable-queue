import globals from 'globals'
import tslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tslint.configs.recommended,
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
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
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
      'no-unused-vars': 'off',
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
