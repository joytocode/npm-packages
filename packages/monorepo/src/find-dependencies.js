import readFile from '@joytocode/fs/lib/read-file'
import listFiles from '@joytocode/fs/lib/list-files'

export default async function findDepedencies (dirPath, depIgnores = []) {
  const files = await listFiles(dirPath, ['node_modules', 'coverage', 'package.js'].concat(depIgnores))
  const result = new Set()
  for (const file of files) {
    const content = await readFile(file)
    const requireMatches = content.match(/(require\(|from )('|")([^('|")]+)('|")/g) || []
    requireMatches.forEach((match) => {
      const packageMatches = /(([^('|")]+))/.exec((/('|")([^('|")/]+)(('|")|(\/[^/]+))/.exec(match)[0]))
      if (packageMatches) {
        if (packageMatches[0].charAt(0) === '@') {
          result.add(packageMatches[0])
        } else {
          result.add(/[^/]+/.exec(packageMatches[0])[0])
        }
      }
    })
  }
  return [...result]
}
