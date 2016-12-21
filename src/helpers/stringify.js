import canonicalize from './canonicalize'
import jsonStringify from './json_stringify'


export default function stringify(value) {
  return jsonStringify(canonicalize(value)).replace(/,(\n|$)/g, '$1')
}
