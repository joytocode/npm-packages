#!/usr/bin/env node

import logError from '@hackello/log/lib/log-error'
import * as commands from '.'

export default async function cli (argv) {
  const [commandName, inPath, outPath] = argv
  await commands[commandName](inPath, outPath)
}

/* istanbul ignore if */
if (require.main === module) {
  Promise.resolve()
    .then(() => process.argv.slice(2))
    .then(cli)
    .then(process.exit)
    .catch(logError)
}
