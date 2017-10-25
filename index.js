/* eslint-disable require-yield, no-invalid-this */

'use strict'

const path = require('path')
const _ = require('lodash')
const multimatch = require('multimatch')

module.exports = function(task) {
  task.plugin('filter', { every: false }, function* (files, opts) {

    if (typeof opts === 'function') {
      this._.files = _.filter(files, opts)
    } else if (_.isRegExp(opts)) {
      this._.files = _.filter(files, (f) => opts.exec(path.join(f.dir, f.base)))
    } else {
      this._.files = _.filter(files, (f) =>
        multimatch([path.join(f.dir, f.base)], _.castArray(opts)).length)
    }
  })
}