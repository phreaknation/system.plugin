/* globals module */
(function () {
  'use strict';

  module.exports = {
    tasks: {
      default: {
        pretasks: [ 'build' ],
        notes: "",
      },
      build: {
        pretasks: [
          'clean',
          'lint',
          'js'
        ],
        notes: "",
      },
      clean: {
        src: './tasks/clean.js',
        notes: "",
      },
      js: {
        src: './tasks/js.js',
        notes: "",
      },
      lint: {
        src: './tasks/lint.js',
        notes: "JS Linter",
      },
      test: {
        src: './tasks/test.js',
        notes: "Test Runner",
      },
      watch: {
        src: './tasks/watch.js',
        pretasks: [ 'build' ],
        notes: "",
      },
    },
    plugins: {
    }
  };
})();
