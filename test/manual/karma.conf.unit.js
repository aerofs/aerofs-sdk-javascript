module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',
    client : { captureConsole : true },

    // frameworks to use
    frameworks: ['jasmine'],

    //directive preprocessors
    preprocessors: {
      '../../web/static/shelob/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: '.*/web',
      moduleName: 'templates'
    },

    // list of files / patterns to load in the browser
    files: [
      '../../web/static/js/jquery.min.js',
      '../../web/static/js/jquery.*.js',
      '../../web/static/js/angular-lib/angular/angular.min.js',
      '../../web/static/js/angular-lib/angular/angular-*.js',
      '../../web/static/js/angular-lib/angular-ui/*.js',
      '../../web/static/js/angular-lib/angular*.js',
      '../../web/static/js/aerofsapi.js',
      'lib/**/*.js',
      '../../web/static-src/js/aerofs.js',
      '../../web/static-src/shelob/js/**/*.js',
      'unit/stubs.js',
      'unit/*Spec.js',
      '../../web/static/shelob/**/*.html',
    ],


    // list of files to exclude
    exclude: [
      '../../web/static/js/angular-lib/angular/angular.min.js.map'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
    ],
  });
};
