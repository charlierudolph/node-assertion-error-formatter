import inlineDiff from './helpers/inline_diff'
import stringify from './helpers/stringify'
import type from './helpers/type'
import unifiedDiff from './helpers/unified_diff'


function identity(x) {
  return x
}


export function format(err, options) {
  if (!options) {
    options = {}
  }
  if (!options.colorDiffAdded) {
    options.colorDiffAdded = identity
  }
  if (!options.colorDiffRemoved) {
    options.colorDiffRemoved = identity
  }
  if (!options.colorErrorMessage) {
    options.colorErrorMessage = identity
  }

  let message
  if (err.message && typeof err.message.toString === 'function') {
    message = err.message + ''
  } else if (typeof err.inspect === 'function') {
    message = err.inspect() + ''
  } else {
    message = ''
  }

  let stack = err.stack || message
  const startOfMessageIndex = stack.indexOf(message)
  if (startOfMessageIndex !== -1) {
    const endOfMessageIndex = startOfMessageIndex + message.length
    message = stack.slice(0, endOfMessageIndex)
    stack = stack.slice(endOfMessageIndex + 1) // remove message from stack
  }

  if (err.uncaught) {
    message = 'Uncaught ' + message
  }

  let actual = err.actual
  let expected = err.expected

  if (err.showDiff !== false && type(actual) === type(expected) && expected !== undefined) {
    if (!(type(actual) === 'string' && type(expected) === 'string')) {
      actual = stringify(actual)
      expected = stringify(expected)
    }

    const match = message.match(/^([^:]+): expected/)
    message = options.colorErrorMessage(match ? match[1] : message)

    if (options.inlineDiff) {
      message += inlineDiff(actual, expected, options)
    } else {
      message += unifiedDiff(actual, expected, options)
    }
  }

  if (stack) {
    stack = stack.replace(/^/gm, '  ') // indent stack trace
  }

  return message + stack
}
