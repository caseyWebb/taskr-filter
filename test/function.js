'use strict'

const fs = require('fs')
const path = require('path')
const Taskr = require('taskr')

const fixtures = path.resolve(__dirname, 'fixtures/*')
const tmp = path.resolve(__dirname, '.tmp/function')

test('taskr-filter w/ function', async () => {
  const taskr = new Taskr({
    plugins: [require('../'), require('@taskr/clear')],
    tasks: {
      *filter(task) {
        yield task
          .source(fixtures)
          .filter((file) => file.base.indexOf('ba') === 0)
          .target(tmp)
      },
      *clear(task) {
        yield task.clear(tmp)
      }
    }
  })

  await taskr.start('filter')

  const exists = (file, shouldExist = true) =>
    expect(fs.existsSync(path.resolve(tmp, file))).toBe(shouldExist)

  exists('foo', false)
  exists('bar')
  exists('baz')

  await taskr.start('clear')
})
