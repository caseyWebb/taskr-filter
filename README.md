# taskr-filter
> Filter plugin for [Taskr][]

[![NPM][npm-shield]][npm]
[![License][license-shield]][license]
[![Build Status][travis-ci-shield]][travis-ci]
[![Coverage Status][codecov-shield]][codecov]
[![Dependency Status][david-dm-shield]][david-dm]
[![Peer Dependency Status][david-dm-peer-shield]][david-dm-peer]

## Install

```yarn
$ yarn add -D taskr taskr-filter
```
*or*
```bash
$ npm install --save-dev taskr taskr-filter
```

## Usage

### Function
```js
export default function* (task) {
  yield task.source(path.join(__dirname, 'src/*'))
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
export default function* (task) {
  yield task.source(path.join(__dirname, 'src/*'))
    .filter(/\.js$/)
    .target('./dist')
}
```

### Glob(s)

Uses [multimatch][], which supports multiple patterns

### RegExp
```js
export default function* (task) {
  yield task.source(path.join(__dirname, 'src/*'))
    .filter('**/*.js')
    .target('./dist')
}
```

**NOTE:** RegExps and globs are tested against the full path. You will need to use globstars, and may want to restrict them to your workspace. For example, to match anything with 'ba', but only in a specified directory, use `path.join(__dirname, 'ba*')`.

[Taskr]: https://github.com/lukeed/taskr

[multimatch]: https://www.npmjs.com/package/multimatch

[npm]: https://npmjs.com/package/taskr-filter
[npm-shield]: https://img.shields.io/npm/v/taskr-filter.svg

[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/taskr-filter.svg

[travis-ci]: https://travis-ci.org/caseyWebb/taskr-filter/
[travis-ci-shield]: https://img.shields.io/travis/caseyWebb/taskr-filter/master.svg

[codecov]: https://codecov.io/gh/caseyWebb/taskr-filter
[codecov-shield]: https://img.shields.io/codecov/c/github/caseyWebb/taskr-filter.svg

[david-dm]: https://david-dm.org/caseyWebb/taskr-filter
[david-dm-shield]: https://img.shields.io/david/caseyWebb/taskr-filter.svg

[david-dm-peer]: https://david-dm.org/caseyWebb/taskr-filter#type=peer
[david-dm-peer-shield]: https://img.shields.io/david/peer/caseyWebb/taskr-filter.svg
