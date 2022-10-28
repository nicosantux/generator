const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  installDependencies() {
    this.npmInstall(
      [
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint",
        "eslint-config-prettier",
        "eslint-config-standard",
        "eslint-config-standard-with-typescript",
        "eslint-plugin-import",
        "eslint-plugin-n",
        "eslint-plugin-node",
        "eslint-plugin-prettier",
        "eslint-plugin-promise",
        "prettier"
      ],
      { "save-dev": true }
    );
  }

  eslint() {
    this.fs.copy(
      this.templatePath(".eslintrc.json"),
      this.destinationPath(".eslintrc.json")
    );
  }
};


