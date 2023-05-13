const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answer = await this.prompt([
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager does your project use?",
        choices: ["npm", "pnpm", "yarn"]
      },
      {
        type: "confirm",
        name: "addScripts",
        message: "Would you like to add lint scripts?",
        default: true
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Does your project use Tailwindcss?",
        default: true
      }
    ])
  }

  eslint() {
    if (this.answer.tailwind) {
      const eslintConfig = this.fs.readJSON(this.templatePath(".eslintrc.json"))

      eslintConfig.extends.push("plugin:tailwindcss/recommended")

      this.destinationPath(this.fs.writeJSON(this.destinationPath(".eslintrc.json"), eslintConfig))
    } else {
      this.fs.copy(
        this.templatePath(".eslintrc.json"),
        this.destinationPath(".eslintrc.json")
      );
    }
  }

  scripts() {
    if(this.answer.addScripts) {
      const pkgJson = {
        scripts: {
          lint: "eslint .",
          ["lint:fix"]: "eslint . --fix"
        }
      }

      this.fs.extendJSON(this.destinationPath("package.json"), pkgJson)
    }
  }

  eslintIgnore() {
    this.fs.copy(
      this.templatePath(".eslintignore"),
      this.destinationPath(".eslintignore")
    );
  }

  editorconfig() {
    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
  }

  installDependencies() {
    this.spawnCommand(this.answer.packageManager,
      [
        this.answer.packageManager === "npm" ? "install" : "add",
        "-D",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint",
        "eslint-config-next",
        "eslint-config-prettier",
        "eslint-plugin-import",
        "eslint-plugin-node",
        "eslint-plugin-prettier",
        "eslint-plugin-promise",
        "eslint-plugin-react",
        "eslint-plugin-react-hooks",
        "prettier",
        this.answer.tailwind ? "eslint-plugin-tailwindcss" : ""
      ]
    );
  }
};
