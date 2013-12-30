export default Ember.View.extend({
  tagName: "a",
  attributeBindings: ["class", "href"],
  click: function(event) {
    event.preventDefault();
    if (!this.get('controller.resource.__list')) {
      if (this.get('controller.resource.isDirty')) {
        this.get('controller.resource').rollback();
      }
    }
    if (this.get('url') === "#/") {
      this.set('url', '');
    }
    return this.get('controller').transitionToRoute(this.get('url'));
  }
});
