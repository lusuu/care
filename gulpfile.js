var argv = require('yargs').argv;
var standardBoilerplate = require('./gulp/standard-boilerplate');

var isDevMode = argv._[0] === 'start';
var isReleaseBuild = process.env.NODE_ENV === 'production';

standardBoilerplate({
  src: 'src/',
  dest: 'dist/',

  // which preprocessor use to compile stylesheets
  stylesSyntax: 'scss', // 'less' or 'scss'

  // root dir for styles, relatively to 'src' setting
  stylesSrc: 'styles/scss/',

  // format resulting CSS according to stylelint rules
  formatCss: true,

  // merge all equivalent media queries across file
  combineMediaQueries: false,

  // generate source maps for resulting CSS files
  sourceMaps: !isReleaseBuild,

  // lint CSS and JS files
  lint: !argv.nolint,

  // if linter encounters error, should it fail or not
  failOnLinterError: !isDevMode,

  // supported browsers, used by autoprefixer
  browserslist: ['last 2 versions', 'IE 10']
});
