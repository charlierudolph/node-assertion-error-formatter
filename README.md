# Node Assertion Error Formatter

Format errors to display a diff between the actual and expected

## Usage
```js
import {format} from 'assertion-error-formatter'

format(error)
```

## API Reference

#### `format(error [, options])`

* `error`: a javascript error
* `options`: An object with the following keys:
  * `colorDiffAdded(str)`: function (default: identity)
    * colorizes a string, used in diffs to highlight the added lines
  * `colorDiffRemoved(str)`: function (default: identity)
    * colorizes a string, used in diffs to highlight the removed lines
  * `colorErrorMessage(str)`: function (default: identity)
    * colorizes a string, used for the error message
  * `inlineDiff`: boolean (default: false)
    * toggle between inline and unified diffs
