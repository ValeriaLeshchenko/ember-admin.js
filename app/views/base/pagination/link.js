export default Ember.View.extend({

  attributeBindings: ["href"],

  tagName: "a",

  href: (function() {
    if (this.get('type') === "next") {
      return this._nextPage();
    } else {
      return this._prevPage();
    }
  }).property('controller.__page'),

  _nextPage: function() {
    console.log(this.get('controller.__controller_name'));
    return "#/" + (this.get('controller.__controller_name')) + "/page/" + (this.get('controller.__nextPage'));
  },

  _prevPage: function() {
    return "#/" + (this.get('controller.__controller_name')) + "/page/" + (this.get('controller.__prevPage'));
  }
});