var pngquant = require('imagemin-pngquant');
var svgo = require('imagemin-svgo');
var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(gulp, config, gp) {
  gulp.task('images', ['clean:images'], function () {
    return gulp.src(config.paths.src.images)
      .pipe(gp.imagemin([
        pngquant(),
        mozjpeg(),
        svgo({
          plugins: [
            { removeViewBox: false }
          ]
        })
      ], { verbose: true }))
      .pipe(gulp.dest(config.paths.dest.imagesDir))
      .on('end', function(){
        config.devServer.reload();
      });
  });
};
