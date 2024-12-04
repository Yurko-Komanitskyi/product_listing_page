module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};