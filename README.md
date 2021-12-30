# taskr-filter

> Filter plugin for [Taskr][]

[![NPM][npm-shield]][npm]
[![License][license-shield]][license]
[![Build Status][build-status-shield]][build-status]
[![Coverage Status][codecov-shield]][codecov]

## Install

```yarn
$ yarn add -D taskr taskr-filter
```

_or_

```bash
$ npm install --save-dev taskr taskr-filter
```

## Usage

### Function

```js
export default function*(task) {
  yield task
    .source(path.join(__dirname, 'src/*'))
    .filter((file) => {
      // file.base
      // file.dir
      // file.data
      return file.base.indexOf('.js') > 1
    })
    .target('./dist')
}
```

### RegExp

```js
export default function*(task) {
  yield task
    .source(path.join(__dirname, 'src/*'))
    .filter(/\.js$/)
    .target('./dist')
}
```

### Glob(s)

Uses [multimatch][], which supports multiple patterns

### RegExp

```js
export default function*(task) {
  yield task
    .source(path.join(__dirname, 'src/*'))
    .filter('**/*.js')
    .target('./dist')
}
```

**NOTE:** RegExps and globs are tested against the full path. You will need to use globstars, and may want to restrict them to your workspace. For example, to match anything with 'ba', but only in a specified directory, use `path.join(__dirname, 'ba*')`.

[taskr]: https://github.com/lukeed/taskr
[multimatch]: https://www.npmjs.com/package/multimatch
[npm]: https://npmjs.com/package/taskr-filter
[npm-shield]: https://img.shields.io/npm/v/taskr-filter.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/taskr-filter.svg
[build-status]: https://github.com/caseyWebb/taskr-filter/actions/workflows/nodejs.yml
[build-status-shield]: https://img.shields.io/github/workflow/status/caseyWebb/taskr-filter/Node%20CI/master
[codecov]: https://codecov.io/gh/caseyWebb/taskr-filter
[codecov-shield]: https://img.shields.io/codecov/c/github/caseyWebb/taskr-filter.svg
