var SiteTile = Ember.Object.extend();

SiteTile.reopenClass({
  setup: function(controllerName, model, action) {
    if (action) {
      return document.title = "%@ - %@ - %@".fmt(controllerName, model.get('id'), action);
    } else {
      return document.title = "%@ - list".fmt(controllerName);
    }
  }
});

export default SiteTile;