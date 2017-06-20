module.exports = function(gulp, config, gp) {
  gulp.task('fonts', ['clean:fonts'], function () {
    return gulp.src(config.paths.src.fonts)
      .pipe(gulp.dest(config.paths.dest.fontsDir))
      .on('end', function(){
        config.devServer.reload();
      });
  });
};
