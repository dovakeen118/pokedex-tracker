module.exports = {
  extends: ["airbnb", "prettier"],
  env: {
    jest: true,
    node: true,
  },
  "import/extensions": ["error", "always", { ignorePackages: true }],
  rules: {
    "prettier/prettier": "error",
    "eslint no-param-reassign": ["error", { props: false }],
  },
  plugins: ["prettier"],
};
