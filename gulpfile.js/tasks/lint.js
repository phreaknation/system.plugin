/* global console */
/* global module */

module.exports = function($) {
  var paths     = {
    src: './src/js/',
  };
  var output =[
    {
      name: 'phreaknation.example.plugin',
      files: [
        $.path.join(paths.src, '/Example Plugin/**/*.js'),
      ],
    },
  ];

  var lint = function lint(config, callback) {
    $.pump(
      [
        $.gulp.src(config.files),
        // $.debug(),
        $.jshint(),
        $.jshint.reporter('default'),
      ],
      (function() {
        console.log('Finished %s...', this.config.name);
        if ($._.isFunction(this.callback)) {
          this.callback();
        }
      }).bind({config: config, callback: callback })
    );
  };

  return function(done) {
    var asyncTasks = [];

    $._.each(output, function(config, index) {
      if ($._.isObject(config)) {
        if (config.files.length > 0) {
          asyncTasks.push((function(callback) {
            lint(this.config, callback);
          }).bind({config: config}));
        }
      }
    });

    $.async.parallel(asyncTasks, function(err, results){
      return done();
    });
  };
};
