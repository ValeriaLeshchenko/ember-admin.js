export default Ember.View.extend({
  tagName: "button",
  classNames: ["btn btn-default"],
  action: '',
  click: function() {
    return this.get('controller').send(this.get('action'), this.get('context'));
  }
});
