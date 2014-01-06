module.exports = {
  options: {
    configFile: 'karma.conf.js',
    reporters: ['coverage', 'dots'],
    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ]
  },
  ci: {
    singleRun: true
  },
  dev: {
    autoWatch: true,
    singleRun: false
  },
  server: {
    background: true,
    coverageReporter: {
      type : ['html'],
      dir : 'coverage/'
    }
  },

  cucumber: {
    configFile: "karma.conf.js",
    singleRun: false,
    browsers: ["PhantomJS"],
    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-phantomjs-launcher'
    ],
    files: [
      {pattern: 'app.template', watched: false, included: false, served: true},
      {pattern: 'features/**/*.feature', watched: true, included: false, served: true},
      {pattern: 'node_modules/karma-cucumberjs/lib/adapter.js', watched: false, included: true, served: true},
      {pattern: 'features/step_definitions/*.js', watched: true, included: true, served: true}
    ]
  },

  browsers: {
    singleRun: true,
    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ]
  }
};
