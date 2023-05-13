const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answer = await this.prompt([
      {
        default: true,
        message: "Does your project use Tailwindcss?",
        name: "tailwind",
        type: "confirm"
      }
    ])
  }

  configuring() {
    if (this.answer.tailwind) {
      const extensions = this.fs.readJSON(this.templatePath(".vscode/.extensions.json"))

      extensions.recommendations.push("bradlc.vscode-tailwindcss")

      this.fs.writeJSON(this.destinationPath(".vscode/.extensions.json"), extensions)
      this.fs.copy(this.templatePath(".vscode/extensions"), this.destinationPath(".vscode/extensions"));
    } else {
      this.fs.copy(this.templatePath(".vscode"), this.destinationPath(".vscode"));
    }
  }
};
