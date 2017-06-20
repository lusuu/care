module.exports = function(gulp, config, gp) {
  gulp.task('clean:html', function () {
    return gulp.src([
      // assuming html files does not have dedicated dir,
      // and typically stored in the dest root dir
      config.paths.dest.htmlDir + '*.html',
      config.paths.dest.scriptsDir], { read: false })
      .pipe(gp.clean());
  });

  gulp.task('clean:fonts', function () {
    return gulp.src([config.paths.dest.fontsDir], { read: false })
      .pipe(gp.clean());
  });

  gulp.task('clean:images', function () {
    return gulp.src([config.paths.dest.imagesDir], { read: false })
      .pipe(gp.clean());
  });

  gulp.task('clean:styles', function () {
    return gulp.src([config.paths.dest.stylesDir + '*.css'], { read: false })
      .pipe(gp.clean());
  });

  gulp.task('clean', function () {
    return gulp.src(config.paths.dest.rootDir)
      .pipe(gp.clean());
  });
};
