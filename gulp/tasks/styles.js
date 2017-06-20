var mqpacker = require('css-mqpacker');
var autoprefixer = require('autoprefixer');
var stylefmt = require('stylefmt');
var lazypipe = require('lazypipe');

module.exports = function(gulp, config, gp) {
  var styleCompiler = ({
    scss: lazypipe()
      .pipe(gp.sass, {
        outputStyle: 'compact'
      })
  })[config.stylesSyntax];

  var processors = [
    autoprefixer({
      browsers: config.browserslist
    })
  ];
  if (config.combineMediaQueries) {
    processors.push(mqpacker());
  }
  if (config.formatCss) {
    processors.push(stylefmt);
  }

  gulp.task('styles', ['clean:styles'], function(){
    return gulp.src(config.paths.src.stylesMainFile)
      .pipe(gp.if(config.sourceMaps, gp.sourcemaps.init()))
      .pipe(styleCompiler())
      // TODO: disable when no in dev mode
      .on('error', function (err) {
        gp.util.log(err.message);
        this.emit('end');
      })
      .pipe(gp.postcss(processors))
      .pipe(gp.if(config.sourceMaps, gp.sourcemaps.write()))
      .pipe(gulp.dest(config.paths.dest.stylesDir))
      .pipe(config.devServer.stream());
  });
};
