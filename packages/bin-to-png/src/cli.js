#!/usr/bin/env node

import logError from '@joytocode/log/lib/log-error'
import inquirer from 'inquirer'
import * as commands from '.'

export default async function cli (argv, answers) {
  const [commandName, inPath, outPath] = argv
  await commands[commandName](inPath, outPath, answers.passphrase)
}

/* istanbul ignore if */
if (require.main === module) {
  const passphrasePrompt = {
    name: 'passphrase',
    type: 'password',
    message: 'Enter passphrase (optional): '
  }
  inquirer.prompt([passphrasePrompt])
    .then((answers) => cli(process.argv.slice(2), answers))
    .then(process.exit)
    .catch(logError)
}
