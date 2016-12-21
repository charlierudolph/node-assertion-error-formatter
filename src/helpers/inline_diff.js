import {diffWordsWithSpace} from 'diff'
import padRight from 'pad-right'


export default function inlineDiff(actual, expected, options) {
  let msg = errorDiff(actual, expected, options)

  // linenos
  const lines = msg.split('\n')
  if (lines.length > 4) {
    const width = String(lines.length).length
    msg = lines.map(function(str, i) {
      return padRight(i + 1, width, ' ') + '|' + ' ' + str
    }).join('\n')
  }

  // legend
  msg = '\n      '
    + options.colorDiffRemoved('actual')
    + ' '
    + options.colorDiffAdded('expected')
    + '\n\n'
    + msg.replace(/^/gm, '      ')
    + '\n'

  return msg
}


function errorDiff(actual, expected, options) {
  return diffWordsWithSpace(actual, expected).map(function(str) {
    if (str.added) {
      return options.colorDiffAdded(str.value)
    }
    if (str.removed) {
      return options.colorDiffRemoved(str.value)
    }
    return str.value
  }).join('')
}
