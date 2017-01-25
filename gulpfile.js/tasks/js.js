/* global console */
/* global module */

module.exports = function($) {
  var paths     = {
    src: './src/js/',
  };
  var output    = [
    {
      name: 'phreaknation.example.plugin',
      template: 'plugin',
      files: [
        $.path.join(paths.src, '/Example Plugin/consts.js'),
        $.path.join(paths.src, '/Example Plugin/index.js'),
        $.path.join(paths.src, '/Example Plugin/schemas/**/*.js'),
        $.path.join(paths.src, '/Example Plugin/funcs/**/*.js'),
      ],
    },
  ];

  var compile = function compile(config, callback) {
    $.pump(
      [
        $.gulp.src(config.files),

        $.debug(),
        $.concat(config.name + '.full.js'),
        $.wrap({ src: './gulpfile.js/templates/' + (config.template || 'module') + '.tmp'}),
        $.beautify({indent_size: 2}),
        $.gulp.dest('./dist'),
        $.stripComments(),
        $.rename(config.name + '.js'),
        $.gulp.dest('./dist'),
        $.gulp.dest('./public/assets/js/plugins/'),
        $.rename(config.name + '.min.js'),
        $.uglify({
          compress: true,
          mangle: true,
        }),
        $.obfuscate(),
        $.gulp.dest('./dist'),
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
            compile(this.config, callback);
          }).bind({config: config}));
        }
      }
    });

    $.async.parallel(asyncTasks, function(err, results){
      return done();
    });
  };
};
