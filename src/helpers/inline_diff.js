import { diffWordsWithSpace } from 'diff';

export default function inlineDiff(actual, expected, colorFns) {
  let msg = errorDiff(actual, expected, colorFns);

  // linenos
  const lines = msg.split('\n');
  if (lines.length > 4) {
    const width = String(lines.length).length;
    msg = lines
      .map(function(str, i) {
        return `${i + 1}`.padEnd(width, ' ') + '|' + ' ' + str;
      })
      .join('\n');
  }

  // legend
  msg =
    '\n    ' +
    colorFns.diffRemoved('actual') +
    ' ' +
    colorFns.diffAdded('expected') +
    '\n\n' +
    msg.replace(/^/gm, '    ') +
    '\n';

  return msg;
}

function errorDiff(actual, expected, colorFns) {
  return diffWordsWithSpace(actual, expected)
    .map(function(str) {
      if (str.added) {
        return colorFns.diffAdded(str.value);
      }
      if (str.removed) {
        return colorFns.diffRemoved(str.value);
      }
      return str.value;
    })
    .join('');
}
