import type from './type';
import { describe, it } from 'mocha';
import { expect } from 'chai';

const examples = [
  {
    description: 'an object',
    input: {},
    output: 'object',
  },
  {
    description: 'an array',
    input: [],
    output: 'array',
  },
  {
    description: 'a number',
    input: 1,
    output: 'number',
  },
  {
    description: 'a boolean',
    input: false,
    output: 'boolean',
  },
  {
    description: 'string',
    input: 'a',
    output: 'string',
  },
  {
    description: 'Infinity',
    input: Infinity,
    output: 'number',
  },
  {
    description: 'null',
    input: null,
    output: 'null',
  },
  {
    description: 'undefined',
    input: undefined,
    output: 'undefined',
  },
  {
    description: 'Date',
    input: new Date(),
    output: 'date',
  },
  {
    description: 'regular expression',
    input: /foo/,
    output: 'regexp',
  },
  {
    description: 'global',
    input: global,
    output: 'global',
  },
];

describe('type', function() {
  examples.forEach(function({ description, input, output }) {
    describe('input is ' + description, function() {
      it('returns ' + output, function() {
        expect(type(input)).to.eql(output);
      });
    });
  });
});
