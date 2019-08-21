import hasProperty from './has_property';
import type from './type';

export default function canonicalize(value, stack) {
  stack = stack || [];

  function withStack(fn) {
    stack.push(value);
    const result = fn();
    stack.pop();
    return result;
  }

  if (stack.indexOf(value) !== -1) {
    return '[Circular]';
  }

  switch (type(value)) {
    case 'array':
      return withStack(function() {
        return value.map(function(item) {
          return canonicalize(item, stack);
        });
      });
    case 'function':
      if (!hasProperty(value)) {
        return '[Function]';
      }
    /* falls through */
    case 'object':
      return withStack(function() {
        const canonicalizedObj = {};
        Object.keys(value)
          .sort()
          .map(function(key) {
            canonicalizedObj[key] = canonicalize(value[key], stack);
          });
        return canonicalizedObj;
      });
    case 'boolean':
    case 'buffer':
    case 'date':
    case 'null':
    case 'number':
    case 'regexp':
    case 'symbol':
    case 'undefined':
      return value;
    default:
      return value.toString();
  }
}
