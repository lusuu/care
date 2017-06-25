var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var objectAssign = require('object-assign');
var loadGulpTasks = require('load-gulp-tasks');
var path = require('path');

module.exports = function(options) {
  var paths = {
    src: {
      rootDir: options.src,
      styles: options.src + options.stylesSrc + '**/*.' + options.stylesSyntax,
      stylesRootDir: options.src + options.stylesSrc,
      stylesMainFile: options.src + options.stylesSrc + 'style.' + options.stylesSyntax,
      stylesVendor: options.src + options.stylesSrc + 'vendor/**/*',
      scripts: options.src + 'js/**/*.js',
      scriptsVendor: options.src + 'js/vendor/**/*',
      images: options.src + 'images/**/*',
      fonts: options.src + 'fonts/**/*',
      html: options.src + 'templates/**/*',
      htmlMainFiles: options.src + 'templates/pages/**/*.html'
    },
    dest: {
      rootDir: options.dest,
      stylesDir: options.dest,
      scriptsDir: options.dest + 'scripts/',
      imagesDir: options.dest + 'images/',
      fontsDir: options.dest + 'fonts/',
      htmlDir: options.dest
    }
  };

  var devServer = browserSync.create();

  loadGulpTasks(gulp, objectAssign({}, options, {
    argv: argv,
    pattern: ['gulp/tasks/*.js'],
    paths: paths,
    devServer: devServer
  }));

  // Tasks
  gulp.task('noop', function() {});

  gulp.task('build', function(done){
    runSequence(
      ['clean'],
      options.lint ? ['lint'] : ['noop'],
      ['images', 'fonts', 'styles', 'html'],
      done);
  });

  gulp.task('start', ['build'], function(){
    devServer.init({
      server: { baseDir: paths.dest.rootDir }
    });

    gp.watch(
      paths.src.styles,
      function(){ gulp.start(['lint:styles', 'styles']); });
    gp.watch([
      paths.src.html,
      paths.src.scripts],
      function(){ gulp.start(['lint:scripts', 'html']); });
    gp.watch(
      paths.src.images,
      function(){ gulp.start('images'); });
    gulp.watch(
      paths.src.fonts,
      function(){ gulp.start('fonts'); });
  });
};
