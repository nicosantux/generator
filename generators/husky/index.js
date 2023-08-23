const fs = require('node:fs/promises')

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.answer = await this.prompt([
      {
        default: false,
        message: 'Do you have husky installed in your project?',
        name: 'isInstalled',
        type: 'confirm',
      },
      {
        choices: ['npm', 'pnpm', 'yarn'],
        message: 'Which package manager does your project use?',
        name: 'packageManager',
        type: 'list',
      },
    ])
  }

  async install() {
    if (!this.answer.isInstalled) {
      this.spawnCommandSync(this.answer.packageManager, [
        this.answer.packageManager === 'npm' ? 'install' : 'add',
        '-D',
        '-E',
        'husky',
        '@commitlint/cli',
        '@commitlint/config-conventional',
      ])

      this.spawnCommandSync('npx', ['husky', 'install'])
    }

    const pkgJson = {
      scripts: {
        commitlint: 'commitlint --edit',
      },
    }

    if (!this.answer.isInstalled) {
      pkgJson.scripts.prepare = 'husky install'
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)

    this.fs.copy(
      this.templatePath('commitlint.config.cjs'),
      this.destinationPath('commitlint.config.cjs'),
    )

    const file = await fs.readFile(this.templatePath('commit-msg'), 'utf-8')

    const fileParts = file.split('\n')

    const commandIndex = fileParts.findIndex((str) => str.startsWith('run'))

    fileParts[commandIndex] = `${this.answer.packageManager} ${fileParts.at(commandIndex)}`

    this.fs.write(this.destinationPath('.husky/commit-msg'), fileParts.join('\n'))
  }
}
