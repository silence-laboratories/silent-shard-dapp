module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: { browser: true, es2021: true, jest: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
    "import",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-deprecated": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: { "@typescript-eslint/ban-types": "off" },
    },
  ],
  settings: {
    "react": {
      "version": "detect"
    }
  }
};
