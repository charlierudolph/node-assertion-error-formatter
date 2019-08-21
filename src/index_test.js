import { format } from './';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';

describe('AssertionErrorFormatter', function() {
  describe('format', function() {
    beforeEach(function() {
      this.options = {
        colorFns: {
          diffAdded(x) {
            return '<da>' + x + '</da>';
          },
          diffRemoved(x) {
            return '<dr>' + x + '</dr>';
          },
          errorMessage(x) {
            return '<em>' + x + '</em>';
          },
          errorStack(x) {
            return '<es>' + x + '</es>';
          },
        },
      };
    });

    describe('with assertion error', function() {
      describe('unified diffs', function() {
        it('should show string diffs', function() {
          const error = {
            actual: 'foo',
            expected: 'bar',
            message: "'foo' to equal 'bar'",
            stack: "'foo' to equal 'bar'\n    line1\n    line2\n    line3",
          };
          expect(format(error, this.options)).to.eql(
            "<em>'foo' to equal 'bar'</em>\n" +
              '    <da>+ expected</da> <dr>- actual</dr>\n' +
              '\n' +
              '    <dr>-foo</dr>\n' +
              '    <da>+bar</da>\n' +
              '<es>\n' +
              '    line1\n' +
              '    line2\n' +
              '    line3</es>'
          );
        });

        it('should show object diffs', function() {
          const error = {
            actual: { x: 1, y: 2 },
            expected: { x: 1, y: 3 },
            message: '{ x: 1, y: 2 } to equal { x: 1, y: 3 }',
            stack:
              '{ x: 1, y: 2 } to equal { x: 1, y: 3 }\n    line1\n    line2\n    line3',
          };
          expect(format(error, this.options)).to.eql(
            '<em>{ x: 1, y: 2 } to equal { x: 1, y: 3 }</em>\n' +
              '    <da>+ expected</da> <dr>- actual</dr>\n' +
              '\n' +
              '     {\n' +
              '       "x": 1\n' +
              '    <dr>-  "y": 2</dr>\n' +
              '    <da>+  "y": 3</da>\n' +
              '     }\n' +
              '<es>\n' +
              '    line1\n' +
              '    line2\n' +
              '    line3</es>'
          );
        });
      });

      describe('inline diffs', function() {
        beforeEach(function() {
          this.options.inlineDiff = true;
        });

        it('should show string diffs', function() {
          const error = {
            actual: 'foo',
            expected: 'bar',
            message: "'foo' to equal 'bar'",
            stack: "'foo' to equal 'bar'\n    line1\n    line2\n    line3",
          };
          expect(format(error, this.options)).to.eql(
            "<em>'foo' to equal 'bar'</em>\n" +
              '    <dr>actual</dr> <da>expected</da>\n' +
              '\n' +
              '    <dr>foo</dr><da>bar</da>\n' +
              '<es>\n' +
              '    line1\n' +
              '    line2\n' +
              '    line3</es>'
          );
        });

        it('should show object diffs', function() {
          const error = {
            actual: { x: 1, y: 2 },
            expected: { x: 1, y: 3 },
            message: '{ x: 1, y: 2 } to equal { x: 1, y: 3 }',
            stack:
              '{ x: 1, y: 2 } to equal { x: 1, y: 3 }\n    line1\n    line2\n    line3',
          };
          expect(format(error, this.options)).to.eql(
            '<em>{ x: 1, y: 2 } to equal { x: 1, y: 3 }</em>\n' +
              '    <dr>actual</dr> <da>expected</da>\n' +
              '\n' +
              '    {\n' +
              '      "x": 1\n' +
              '      "y": <dr>2</dr><da>3</da>\n' +
              '    }\n' +
              '<es>\n' +
              '    line1\n' +
              '    line2\n' +
              '    line3</es>'
          );
        });
      });
    });

    describe('with other error', function() {
      describe('message is in the stack', function() {
        it('returns the stack only', function() {
          const error = {
            message: 'abc',
            stack: 'abc\n    line1\n    line2\n    line3',
          };
          expect(format(error, this.options)).to.eql(
            '<em>abc</em><es>\n' +
              '    line1\n' +
              '    line2\n' +
              '    line3</es>'
          );
        });
      });

      describe('message is not in the stack', function() {
        it('returns the message and the stack', function() {
          const error = {
            message: 'abc',
            stack: 'line1\nline2\nline3',
          };
          expect(format(error, this.options)).to.eql(
            '<em>abc</em><es>\n' + 'line1\n' + 'line2\n' + 'line3</es>'
          );
        });
      });
    });

    describe('with string', function() {
      it('outputs the string', function() {
        expect(format('abc', this.options)).to.eql('<em>abc</em>');
      });
    });

    describe('with object', function() {
      it('outputs the json stringified object', function() {
        expect(format({ x: 1, y: 2 }, this.options)).to.eql(
          '<em>{"x":1,"y":2}</em>'
        );
      });
    });
  });
});
