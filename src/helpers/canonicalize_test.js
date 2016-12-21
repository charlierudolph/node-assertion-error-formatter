import canonicalize from './canonicalize'

function functionWithProperties() {}
functionWithProperties.a = 1

const circularObject = {}
circularObject.a = circularObject

const circularArray = []
circularArray.push(circularArray)

const nestedCircular = {a: [{}]}
nestedCircular.a[0].a = nestedCircular

const examples = [{
  input: {b: 1, a: 2},
  inputDescription: 'an object with unsorted keys',
  output: {a: 2, b: 1},
  outputDescription: 'the object with sorted keys'
}, {
  input() {},
  inputDescription: 'function without properties',
  output: '[Function]',
  outputDescription: '[Function]'
}, {
  input: functionWithProperties,
  inputDescription: 'function with properties',
  output: {a: 1},
  outputDescription: 'the object'
}, {
  input: circularObject,
  inputDescription: 'circular object',
  output: {a: '[Circular]'},
  outputDescription: 'the circular property as [Circular]'
}, {
  input: circularArray,
  inputDescription: 'circular array',
  output: ['[Circular]'],
  outputDescription: 'the circular property as [Circular]'
}, {
  input: nestedCircular,
  inputDescription: 'nested circular object',
  output: {a: [{a: '[Circular]'}]},
  outputDescription: 'the circular property as [Circular]'
}]

describe('canonicalize', function() {
  examples.forEach(function({input, inputDescription, output, outputDescription}) {
    describe('input is ' + inputDescription, function() {
      it('returns ' + outputDescription, function() {
        expect(canonicalize(input)).to.eql(output)
      })
    })
  })
})
