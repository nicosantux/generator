const Generator = require("yeoman-generator");
const fs = require("fs")

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

   installDependencies() {
    this.spawnCommandSync(this.answer.packageManager,
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

  eslint() {
    if (this.answer.tailwind) {
      const eslintConfig = fs.readFileSync(this.templatePath(".eslintrc.json"), "utf-8")
      const eslintConfigParsed = JSON.parse(eslintConfig)

      eslintConfigParsed.extends.push("plugin:tailwindcss/recommended")

      this.destinationPath(fs.writeFileSync(".eslintrc.json", JSON.stringify(eslintConfigParsed, null, 2)))
    } else {
      this.fs.copy(
        this.templatePath(".eslintrc.json"),
        this.destinationPath(".eslintrc.json")
      );
    }
  }

  scripts() {
    if(this.answer.addScripts) {
      const packageJson = fs.readFileSync(this.destinationPath("package.json"), "utf-8")
      const packageJsonParse = JSON.parse(packageJson)

      packageJsonParse.scripts.lint = "eslint ./src"
      packageJsonParse.scripts["lint:fix"] = "eslint ./src --fix"

      this.destinationPath(fs.writeFileSync("package.json", JSON.stringify(packageJsonParse, null, 2)))
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
};
