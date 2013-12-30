export default Ember.View.extend({

  tagName: "button",

  classNames: ["btn btn-default"],

  attributeBindings: ["type"],

  classNameBindings: ["isActive:active: "],

  click: function() {
    if (!this.get('isActive')) {
      return this.get('controller').send("changePerPage", this.get('count'));
    }
  },

  isActive: (function() {
    return this.get('controller.__perPage') === this.get('count');
  }).property('controller.__perPage')
});
