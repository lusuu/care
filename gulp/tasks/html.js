var lazypipe = require('lazypipe');

module.exports = function(gulp, config, gp) {
  gulp.task('html', ['clean:html'], function () {
    var htmlChannel = lazypipe()
      .pipe(gp.htmlhint)
      .pipe(gp.htmlhint.reporter)
      .pipe(gp.prettify, {
        // all html should be formated, please, keep space
        unformatted: ' ',
        indent_char: ' ',
        indent_size: 2,
        extra_liners: "none"
      });

    return gulp.src(config.paths.src.htmlMainFiles)
      .pipe(gp.fileInclude({
        basepath: config.paths.src.rootDir
      }))
      .pipe(gp.useref({
        searchPath: 'src'
      }))
      .pipe(gp.if('*.html', htmlChannel()))
      .pipe(gulp.dest(config.paths.dest.htmlDir))
      .on('end', function(){
        config.devServer.reload();
      });
  });
};
