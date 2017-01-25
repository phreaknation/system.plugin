/* global console */
/* global module */

module.exports = function($) {
  return function(done) {
    $.gulp.watch('./src/js/**/*.js', [ 'lint', 'js' ]);
  };
};
