module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  globals: {
    $: 'readonly',
    $$: 'readonly',
    before: 'readonly',
    browser: 'readonly',
  },
  plugins: ['jsx-a11y', 'prettier'],
  ignorePatterns: ["/lde/src/service/openapi/client-gen/models/Recommendation.ts", "/**/__snapshots__/**"],
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'import/no-cycle': 'warn',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 0,
    'no-loop-func': 0,
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
        },
      },
    ],
    'no-console': 'off',
    'guard-for-in': 0,
    'no-restricted-syntax':0,
    'no-eval': 0

  },
}
