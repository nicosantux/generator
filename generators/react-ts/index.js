const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answer = await this.prompt([
      {
        choices: ["npm", "pnpm", "yarn"],
        message: "Which package manager does your project use?",
        name: "packageManager",
        type: "list"
      },
      {
        default: true,
        message: "Would you like to add lint scripts?",
        name: "addScripts",
        type: "confirm"
      },
      {
        default: true,
        message: "Does your project use Tailwindcss?",
        name: "tailwind",
        type: "confirm"
      }
    ])
  }

  configuring() {
    if (this.answer.addScripts) {
      const pkgJson = {
        scripts: {
          lint: "eslint .",
          ["lint:fix"]: "eslint . --fix --ext .js,.jsx,.ts,.tsx,.cjs,.mjs"
        }
      }

      this.fs.extendJSON(this.destinationPath("package.json"), pkgJson)
    }

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

    this.fs.copy(
      this.templatePath(".eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
  }

  install() {
    this.spawnCommandSync(this.answer.packageManager,
      [
        this.answer.packageManager === "npm" ? "install" : "add",
        "-D",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint-config-prettier",
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
};
