import stringify from './stringify';
import { describe, it } from 'mocha';
import { expect } from 'chai';

function functionWithProperties() {}
functionWithProperties.a = 1;

const circularObject = {};
circularObject.a = circularObject;

const circularArray = [];
circularArray.push(circularArray);

const nestedCircular = { a: [{}] };
nestedCircular.a[0].a = nestedCircular;

const examples = [
  {
    input: { b: 1, a: 2 },
    inputDescription: 'an object with unsorted keys',
    output: '{\n' + '  "a": 2\n' + '  "b": 1\n' + '}',
    outputDescription: 'the object with sorted keys',
  },
  {
    input() {},
    inputDescription: 'function with not properties',
    output: '[Function]',
    outputDescription: '[Function]',
  },
  {
    input: functionWithProperties,
    inputDescription: 'function with properties',
    output: '{\n' + '  "a": 1\n' + '}',
    outputDescription: 'the object',
  },
  {
    input: circularObject,
    inputDescription: 'circular object',
    output: '{\n' + '  "a": [Circular]\n' + '}',
    outputDescription: 'the circular property as [Circular]',
  },
  {
    input: circularArray,
    inputDescription: 'circular array',
    output: '[\n' + '  [Circular]\n' + ']',
    outputDescription: 'the circular property as [Circular]',
  },
  {
    input: nestedCircular,
    inputDescription: 'nested circular object',
    output:
      '{\n' +
      '  "a": [\n' +
      '    {\n' +
      '      "a": [Circular]\n' +
      '    }\n' +
      '  ]\n' +
      '}',
    outputDescription: 'the circular property as [Circular]',
  },
  {
    input: null,
    inputDescription: 'null',
    output: '[null]',
    outputDescription: '[null]',
  },
  {
    input: undefined,
    inputDescription: 'undefined',
    output: '[undefined]',
    outputDescription: '[undefined]',
  },
  {
    input: -0,
    inputDescription: '-0',
    output: '-0',
    outputDescription: '-0',
  },
  {
    input: new Date(0),
    inputDescription: 'valid date',
    output: '[Date: 1970-01-01T00:00:00.000Z]',
    outputDescription: '[Date <ISOString>]',
  },
  {
    input: new Date(NaN),
    inputDescription: 'invalid date',
    output: '[Date: Invalid Date]',
    outputDescription: '[Date Invalid Date]',
  },
  {
    input: Buffer.from([1, 2, 3]),
    inputDescription: 'buffer',
    output: '[Buffer: [\n' + '  1\n' + '  2\n' + '  3\n' + ']]',
    outputDescription: '[Buffer <stringified data>]',
  },
];

describe('stringify', function() {
  examples.forEach(function({
    input,
    inputDescription,
    output,
    outputDescription,
  }) {
    describe('input is ' + inputDescription, function() {
      it('returns ' + outputDescription, function() {
        expect(stringify(input)).to.eql(output);
      });
    });
  });
});
