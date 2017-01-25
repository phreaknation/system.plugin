/* global console */
/* global module */

module.exports = function($) {
  var locations = [
    {
      name: 'Distribution Folder',
      location: './dist/',
    }
  ];

  var clean = function clean(config, callback) {
    $.pump(
      [
        $.gulp.src(config.location, {read: false}),
        // $.debug(),
        $.clean(),
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

    $._.each(locations, function(config, index) {
      if ($._.isObject(config)) {
        if ($._.isString(config.location)) {
          asyncTasks.push((function(callback) {
            clean(this.config, callback);
          }).bind({config: config}));
        }
      }
    });

    $.async.parallel(asyncTasks, function(err, results){
      return done();
    });
  };
};
