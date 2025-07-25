module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "react-native", "react-hooks"],
  env: {
    "react-native/react-native": true,
    es6: true,
    node: true,
  },
  rules: {
    // Error for undefined variables - this is what you specifically requested
    "no-undef": "error",
    //"no-unused-vars": "warn",

    // React specific rules
    "react/prop-types": "off", // Turn off if you're using TypeScript or don't want prop-types
    "react/react-in-jsx-scope": "off", // Not needed in React 17+

    // React Native specific rules
  /*   "react-native/no-unused-styles": "warn",
    "react-native/split-platform-components": "warn",
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "warn", */

    // General code quality rules
    //"no-console": "warn",
    //"prefer-const": "error",
    //"no-var": "error",

    // React Hooks rules
    //"react-hooks/rules-of-hooks": "error",
    //"react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    // Add any global variables you want to allow
    __DEV__: "readonly",
    fetch: "readonly",
    FormData: "readonly",
    navigator: "readonly",
  },
};
