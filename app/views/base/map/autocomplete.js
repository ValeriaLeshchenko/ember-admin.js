export default Ember.TextField.extend({
  keyPress: function(event) {
    if (event.keyCode === 13) {
      return event.preventDefault();
    }
  }
});
