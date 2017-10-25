'use strict'

const fs = require('fs')
const path = require('path')
const test = require('ava')
const Taskr = require('taskr')

const fixtures = path.resolve(__dirname, 'fixtures/*')
const tmp = path.resolve(__dirname, '.tmp/regexp')

test('taskr-filter w/ regexp', async (t) => {
  const taskr = new Taskr({
    plugins: [
      require('../'),
      require('@taskr/clear')
    ],
    tasks: {
      * filter(task) {
        yield task
          .source(fixtures)
          .filter(/.*ba.$/)
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
