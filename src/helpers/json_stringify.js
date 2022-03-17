import type from './type';

export default function jsonStringify(object, depth) {
  depth = depth || 1;

  switch (type(object)) {
    case 'boolean':
    case 'regexp':
    case 'symbol':
      return object.toString();
    case 'null':
    case 'undefined':
      return '[' + object + ']';
    case 'array':
    case 'object':
      return jsonStringifyProperties(object, depth);
    case 'number':
      if (object === 0 && 1 / object === -Infinity) {
        return '-0';
      } else {
        return object.toString();
      }
    case 'date':
      return jsonStringifyDate(object);
    case 'buffer':
      return jsonStringifyBuffer(object, depth);
    default:
      if (object === '[Function]' || object === '[Circular]') {
        return object;
      } else {
        return JSON.stringify(object); // string
      }
  }
}

function jsonStringifyBuffer(object, depth) {
  const { data } = object.toJSON();
  return '[Buffer: ' + jsonStringify(data, depth) + ']';
}

function jsonStringifyDate(object) {
  let str;
  if (isNaN(object.getTime())) {
    str = object.toString();
  } else {
    str = object.toISOString();
  }
  return '[Date: ' + str + ']';
}

function jsonStringifyProperties(object, depth) {
  const space = 2 * depth;
  const start = type(object) === 'array' ? '[' : '{';
  const end = type(object) === 'array' ? ']' : '}';
  const length =
    typeof object.length === 'number'
      ? object.length
      : Object.keys(object).length;
  let addedProperties = 0;
  let str = start;

  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      addedProperties += 1;
      str +=
        '\n' +
        ' '.repeat(space) +
        (type(object) === 'array' ? '' : '"' + prop + '": ') +
        jsonStringify(object[prop], depth + 1) +
        (addedProperties === length ? '' : ',');
    }
  }

  if (str.length !== 1) {
    str += '\n' + ' '.repeat(space - 2);
  }

  return str + end;
}
