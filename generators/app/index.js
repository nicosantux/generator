"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  welcome() {
    this.log(`
    ==================================================================
                    Welcome to Santux-Generator!

    Type yo santux:<option> to start. For example: yo santux:next-ts

    Options: next-ts, react-ts, react, vscode
    ==================================================================`);
  }
};
