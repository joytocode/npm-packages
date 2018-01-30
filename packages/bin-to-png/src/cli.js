#!/usr/bin/env node

import logError from '@hackello/log/lib/log-error'
import inquirer from 'inquirer'
import * as commands from '.'

export default async function cli (argv) {
  const [commandName, inPath, outPath, passphrase] = argv
  await commands[commandName](inPath, outPath, passphrase)
}

/* istanbul ignore if */
if (require.main === module) {
  const passphraseQ = {
    type: 'password',
    name: 'passphrase',
    message: 'Please enter passphrase (empty for no passphrase): '
  }
  inquirer.prompt([passphraseQ])
    .then((answers) => process.argv.slice(2).concat(answers.passphrase))
    .then(cli)
    .then(process.exit)
    .catch(logError)
}
