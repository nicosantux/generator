'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing() {
    this.log(`
    ==================================================================
                      Welcome to Santux-Generator!
    ==================================================================`)
  }

  async prompting() {
    this.answer = await this.prompt([
      {
        choices: ['husky', 'next-ts', 'node-ts', 'react', 'react-ts', 'vscode'],
        message: 'Select the generator you want to run',
        name: 'generator',
        type: 'list',
      },
    ])
  }

  configuring() {
    this.composeWith(require.resolve(`../${this.answer.generator}`))
  }
}
