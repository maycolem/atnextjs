module.exports = {
     env: {
          browser: true,
          es2021: true,
          node: true,
     },
     settings: {
          react: {
               version: 'detect',
          },
     },
     extends: ['plugin:react/recommended', 'standard', 'prettier'],
     parserOptions: {
          ecmaFeatures: {
               jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
     },
     plugins: ['react'],
     rules: {
          'react/prop-types': 'off',
          'react/react-in-jsx-scope': 'off',
          'no-unused-vars': 'off',
          'react/jsx-sort-props': 'warn',
     },
     globals: {
          fetch: false,
     },
}
