module.exports = {
  env: {
    browser: true,
    es6: true
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    // indent: ['warn', 2],
    // 'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        arrowParens: 'avoid'
      }
    ],
    'sort-imports': [
      0,
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-keys': [0, 'asc', { caseSensitive: true, natural: true, minKeys: 2 }],
    eqeqeq: [1, 'always'],
    'no-undef': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    // 'no-mixed-operators': [
    //   1,
    //   {
    //     allowSamePrecedence: true
    //   }
    // ],
    // 'eol-last': [2, 'always'],
    'no-confusing-arrow': 0,
    // 'arrow-parens': [2, 'as-needed'],
    // 'arrow-spacing': ['error', { before: true, after: true }],
    // 'arrow-body-style': ['warn', 'as-needed'],
    // 'no-extra-parens': [
    //   'warn',
    //   'all',
    //   {
    //     conditionalAssign: false,
    //     nestedBinaryExpressions: false,
    //     ignoreJSX: 'none',
    //     enforceForArrowConditionals: false
    //   }
    // ],
    'no-param-reassign': 0,
    'prefer-template': 0,
    'prefer-promise-reject-errors': 0,
    'no-script-url': 0,
    'no-unused-expressions': 0,
    // "dot-notation": 0,

    'import/prefer-default-export': 0,
    'import/no-useless-path-segments': 1,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-duplicates': 0,
    'import/order': 0,
    'import/newline-after-import': 1,
    'import/no-named-as-default-member': 0,
    'import/namespace': 0,
    'import/named': 0
  }
};
