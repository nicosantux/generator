const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  installDependencies() {
    this.npmInstall(
      [
        "eslint-config-prettier",
        "eslint-config-standard",
        "eslint-plugin-import",
        "eslint-plugin-node",
        "eslint-plugin-prettier",
        "eslint-plugin-promise",
        "eslint-plugin-react-hooks",
        "eslint-plugin-react",
        "eslint",
        "prettier"
      ],
      { "save-dev": true }
    );
  }

  eslint() {
    this.fs.copy(
      this.templatePath(".eslintrc.js"),
      this.destinationPath(".eslintrc.js")
    );
  }

  env() {
    this.fs.copy(this.templatePath(".env"), this.destinationPath(".env"));
  }
};
