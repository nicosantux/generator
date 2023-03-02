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


