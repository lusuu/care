module.exports = function(gulp, config, gp) {
  gulp.task('lint', ['lint:styles', 'lint:scripts']);

  gulp.task('lint:styles', function () {
    var files = [
      config.paths.src.styles,
      '!' + config.paths.src.stylesVendor
    ];

    return gulp.src(files)
      .pipe(gp.stylelint({
        failAfterError: config.failOnLinterError,
        reporters: [
          { formatter: 'string', console: true }
        ],
        syntax: config.stylesSyntax
      }));
  });

  gulp.task('lint:scripts', function () {
    return gulp.src([
      config.paths.src.scripts,
      '!' + config.paths.src.scriptsVendor
    ])
    .pipe(gp.eslint())
    .pipe(gp.eslint.format())
    .pipe(gp.if(config.failOnLinterError, gp.eslint.failAfterError()));
  });
};
