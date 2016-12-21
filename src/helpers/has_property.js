export default function hasProperty(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return true
    }
  }
  return false
}
