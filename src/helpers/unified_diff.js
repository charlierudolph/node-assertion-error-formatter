import {createPatch} from 'diff'

export default function unifiedDiff(actual, expected, options) {
  const indent = '      '
  function cleanUp(line) {
    if (line.length === 0) {
      return ''
    }
    if (line[0] === '+') {
      return indent + options.colorDiffAdded(line)
    }
    if (line[0] === '-') {
      return indent + options.colorDiffRemoved(line)
    }
    if (line.match(/\@\@/)) {
      return null
    }
    if (line.match(/\\ No newline/)) {
      return null
    }
    return indent + line
  }
  function notBlank(line) {
    return typeof line !== 'undefined' && line !== null
  }
  const msg = createPatch('string', actual, expected)
  const lines = msg.split('\n').splice(4)
  return '\n      '
    + options.colorDiffAdded('+ expected') + ' '
    + options.colorDiffRemoved('- actual')
    + '\n\n'
    + lines.map(cleanUp).filter(notBlank).join('\n')
}
