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
    files: [
      {pattern: 'node_modules/karma-cucumberjs/lib/adapter.js', watched: false, included: true, served: true},
      {pattern: 'vendor/jquery/jquery.min.js'},
      {pattern: 'vendor/handlebars/handlebars.js'},
      {pattern: 'vendor/ember/ember.js'},
      {pattern: 'vendor/ember-data/ember-data.js'},
      {pattern: 'vendor/jquery-mockjax/jquery.mockjax.js'},
      {pattern: 'vendor/chance/chance.js'},
      {pattern: 'vendor/bootstrap/dist/js/bootstrap.min.js'},
      {pattern: 'vendor/bootstrap/dist/css/bootstrap.min.css'},
      {pattern: 'dist/ember-admin.min.js'},
      {pattern: 'dist/ember-admin.css'},
      {pattern: 'tests/helpers/*.js'},
      {pattern: 'app.template', watched: false, included: false, served: true},
      {pattern: 'features/**/*.feature', watched: true, included: false, served: true},
      {pattern: 'features/step_definitions/*.js', watched: true, included: true, served: true}
    ],

    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-phantomjs-launcher'
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
