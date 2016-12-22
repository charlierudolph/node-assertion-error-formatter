import {AssertionError} from 'assert'
import {format} from './'

describe('AssertionErrorFormatter', function() {
  describe('format', function() {
    beforeEach(function() {
      this.options = {
        colorFns: {
          diffAdded(x) {
            return '<da>' + x + '</da>'
          },
          diffRemoved(x) {
            return '<dr>' + x + '</dr>'
          },
          errorMessage(x) {
            return '<em>' + x + '</em>'
          },
          errorStack(x) {
            return '<es>' + x + '</es>'
          }
        }
      }
    })

    describe('with assertion error', function() {
      describe('unified diffs', function() {
        it('should show string diffs', function() {
          const error = new AssertionError({
            actual: 'foo',
            expected: 'bar',
            operator: 'to equal'
          })
          expect(format(error, this.options)).to.eql(
            '<em>AssertionError: \'foo\' to equal \'bar\'</em>\n' +
            '    <da>+ expected</da> <dr>- actual</dr>\n' +
            '\n' +
            '    <dr>-foo</dr>\n' +
            '    <da>+bar</da>\n'
          )
        })

        it('should show object diffs', function() {
          const error = new AssertionError({
            actual: {x: 1, y: 2},
            expected: {x: 1, y: 3},
            operator: 'to equal'
          })
          expect(format(error, this.options)).to.eql(
            '<em>AssertionError: { x: 1, y: 2 } to equal { x: 1, y: 3 }</em>\n' +
            '    <da>+ expected</da> <dr>- actual</dr>\n' +
            '\n' +
            '     {\n' +
            '       "x": 1\n' +
            '    <dr>-  "y": 2</dr>\n' +
            '    <da>+  "y": 3</da>\n' +
            '     }\n'
          )
        })
      })

      describe('inline diffs', function() {
        beforeEach(function() {
          this.options.inlineDiff = true
        })

        it('should show string diffs', function() {
          const error = new AssertionError({
            actual: 'foo',
            expected: 'bar',
            operator: 'to equal'
          })
          expect(format(error, this.options)).to.eql(
            '<em>AssertionError: \'foo\' to equal \'bar\'</em>\n' +
            '    <dr>actual</dr> <da>expected</da>\n' +
            '\n' +
            '    <dr>foo</dr><da>bar</da>\n'
          )
        })

        it('should show object diffs', function() {
          const error = new AssertionError({
            actual: {x: 1, y: 2},
            expected: {x: 1, y: 3},
            operator: 'to equal'
          })
          expect(format(error, this.options)).to.eql(
            '<em>AssertionError: { x: 1, y: 2 } to equal { x: 1, y: 3 }</em>\n' +
            '    <dr>actual</dr> <da>expected</da>\n' +
            '\n' +
            '    {\n' +
            '      "x": 1\n' +
            '      "y": <dr>2</dr><da>3</da>\n' +
            '    }\n'
          )
        })
      })
    })

    describe('with other error', function() {
      it('colors the error message', function() {
        const error = {
          message: 'abc',
          stack: 'abc\n    def\n    ghi'
        }
        //const error2 = new Error('abc')
        expect(format(error, this.options)).to.eql(
          '<em>abc</em><es>\n' +
          '    def\n' +
          '    ghi</es>'
        )
      })
    })

    describe('with string', function() {
      it('outputs the string', function() {
        expect(format('abc', this.options)).to.eql('<em>abc</em>')
      })
    })
  })
})
