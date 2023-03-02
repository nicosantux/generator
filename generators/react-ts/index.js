const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answer = await this.prompt([
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager does your project use?",
        choices: ["npm", "pnpm", "yarn"]
      }
    ])
  }

  installDependencies() {
    this.spawnCommandSync(this.answer.packageManager,
      [
        this.answer.packageManager === "npm" ? "install" : "add",
        "-D",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
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
      ]
    );
  }

  eslint() {
    this.fs.copy(
      this.templatePath(".eslintrc.json"),
      this.destinationPath(".eslintrc.json")
    );
  }
};
