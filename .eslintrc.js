module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: ["node_modules/*", ".next/*", ".out/*", "!.prettierrc.js"], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["eslint:recommended"],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      plugins: ["@typescript-eslint"],
      extends: [
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended', // TypeScript rules
        // 'plugin:react/recommended', // React rules
        // 'plugin:react-hooks/recommended', // React hooks rules
        // 'prettier/@typescript-eslint', // Prettier plugin
        // 'plugin:prettier/recommended', // Prettier recommended rules
        "prettier",
      ],
      rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        // "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-unused-vars": "off",
        "no-control-regex": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-sparse-arrays": "off",
        "no-extra-boolean-cast": "off",
        "no-useless-escape": "off",
      },
    },
  ],
};
