/* global require */

var fs                = require('fs');
var path              = require('path');
var _                 = require('lodash');
var config            = require('./config.js');
var tmpTaskError      = _.template('Task script `<%= taskname %>` not found at `<%= src %>`');

var gulp      = require('gulp');
var plugins           = require('gulp-load-plugins')();
var secondaryPlugins = {
  _: _,
  async: require('async'),
  // autoprefixer: require('autoprefixer'),
  // browserSync: require('browser-sync'),
  chalk: require('chalk'),
  gulp: require('gulp'),
  moment: require('moment'),
  path: path,
  pump: require('pump'),
  // postcss: require('postcss')
};

plugins = _.extend(plugins, secondaryPlugins);

var gulp = plugins.gulp;

gulp.on('stop', function() {
  if (!global.isWatching) {
    process.nextTick(function() {
      process.exit(0);
    });
  }
});

if (!_.isUndefined(config.tasks)) {
  console.log('Loading Tasks...');
  _.each(config.tasks, function(options, taskname) {
    var task;
    // if (!_.isUndefined(options.pretasks))

    if (!_.isUndefined(options.src)) {
      var taskpath = path.join(__dirname, options.src);
      if (fs.existsSync(taskpath)) {
        task = require(taskpath)(plugins);
      }
      else {
        throw Error(tmpTaskError({taskname:taskname, src:options.src}));
      }
    }

    console.log('Task `%s` loaded.', taskname);
    if (!_.isUndefined(options.pretasks))
      gulp.task(taskname, options.pretasks, task);
    else
      gulp.task(taskname, task);
  });
  console.log('Tasks Loaded');
}
