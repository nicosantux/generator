"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  welcome() {
    this.log(`
    ==================================================================
                      Welcome to Santux-Generator!
    ==================================================================`);
  }

  async prompting() {
    this.answer = await this.prompt([
      {
        choices: ["next-ts", "node-ts", "react", "react-ts", "vscode"],
        message: "Which package manager does your project use?",
        name: "generator",
        type: "list",
      },
    ]);
  }

  install() {
    this.spawnCommandSync(`yo santux:${this.answer.generator}`);
  }
};
