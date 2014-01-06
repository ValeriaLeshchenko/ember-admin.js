addStepDefinitions(function (scenario) {
  // Provide a custom World constructor. It's optional, a default one is supplied.
  scenario.World = function (callback) {
    callback();
  };



  // Define your World, here is where you can add some custom utlity functions you
  // want to use with your Cucumber step definitions, this is usually moved out
  // to its own file that you include in your Karma config
  var proto = scenario.World.prototype;
  proto.appSpecificUtilityFunction = function someHelperFunc() {
    // do some common stuff with your app
  };

  scenario.Before(function (callback) {
    // Use a custom utility function
//    window.App = startApp();
    this.appSpecificUtilityFunction();

    callback();
  });

  var firstNumber;
  var secondNumber;
  var sum = 0;

  scenario.Given(/^I have the number (\d+) and (\d+)$/, function(arg1, arg2, callback) {
    firstNumber = parseInt(arg1);
    secondNumber = parseInt(arg2);
    callback();
  });

  scenario.When(/^I add them together$/, function(callback) {
    sum = firstNumber + secondNumber;
    callback();
  });

  scenario.Then(/^I should have (\d+)$/, function(arg1, callback) {
    var expectedSum = parseInt(arg1);
    if (expectedSum !== sum) {
      throw new Error('It doesn\'t add up! ' + arg1 + ' !== ' + sum);
    }
    callback();
  });

  scenario.After(function (callback) {
//    Ember.run(App, 'destroy');
    callback();
  });
});
