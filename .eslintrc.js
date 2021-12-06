module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/vue3-essential", "@vue/airbnb"],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-unused-vars': ['warn', { args: 'none' }],
    'no-console': 'warn',
    'no-debugger': 'off',
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],

  extends: ["plugin:vue/essential", "@vue/airbnb"],

  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb'
  ]
};
