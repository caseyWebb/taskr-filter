'use strict'

const fs = require('fs')
const path = require('path')
const test = require('ava')
const Taskr = require('taskr')

const fixtures = path.resolve(__dirname, 'fixtures')
const tmpRoot = path.resolve(__dirname, '.tmp/glob')

test('taskr-filter w/ single glob', async (t) => {
  const tmp = path.join(tmpRoot, 'single')
  const taskr = new Taskr({
    plugins: [
      require('../'),
      require('@taskr/clear')
    ],
    tasks: {
      * filter(task) {
        yield task
          .source(path.join(fixtures, '*'))
          .filter(path.join(fixtures, 'ba*'))
          .target(tmp)
      },
      * clear(task) {
        yield task.clear(tmp)
      }
    }
  })

  await taskr.start('filter')

  const exists = (file) => fs.existsSync(path.resolve(tmp, file))

  t.false(exists('foo'))
  t.true(exists('bar'))
  t.true(exists('baz'))

  await taskr.start('clear')
})

test('taskr-filter w/ multiple globs', async (t) => {
  const tmp = path.join(tmpRoot, 'multi')
  const taskr = new Taskr({
    plugins: [
      require('../'),
      require('@taskr/clear')
    ],
    tasks: {
      * filter(task) {
        yield task
          .source(path.join(fixtures, '*'))
          .filter([
            '**/*',
            '!**/foo'
          ])
          .target(tmp)
      },
      * clear(task) {
        yield task.clear(tmp)
      }
    }
  })

  await taskr.start('filter')

  const exists = (file) => fs.existsSync(path.resolve(tmp, file))

  t.false(exists('foo'))
  t.true(exists('bar'))
  t.true(exists('baz'))

  await taskr.start('clear')
})

