#!/usr/bin/env node

import logError from '@hackello/log/lib/log-error'
import monorepo from '.'

export default async function cli (argv) {
  return (await monorepo(argv)) || 0
}

/* istanbul ignore if */
if (require.main === module) {
  Promise.resolve()
    .then(() => process.argv.slice(2))
    .then(cli)
    .then(process.exit)
    .catch(logError)
}
