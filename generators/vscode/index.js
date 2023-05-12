const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  vscode() {
    this.fs.copy(this.templatePath(".vscode"), this.destinationPath(".vscode"));
  }
};
