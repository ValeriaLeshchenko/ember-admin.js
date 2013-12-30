export default Ember.View.extend({
  tagName: "li",

  classNameBindings: ["isActive:active"],

  isActive: (function() {
    if (this.get('context.url') === "#%@".fmt(this.get('controller.activeMenu'))) {
      return true;
    }
    return this._hasChild();
  }).property('context', 'context.children', 'controller.activeMenu'),

  _hasChild: function() {
    var hasChild,
      _this = this;
    if (!this.get('context.children')) {
      return false;
    }
    hasChild = false;
    this.get('context.children').forEach(function(item) {
      if (item.url === "#%@".fmt(_this.get('controller.activeMenu'))) {
        return hasChild = true;
      }
    });
    return hasChild;
  }
});
