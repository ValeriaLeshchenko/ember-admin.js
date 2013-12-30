import BaseActionView from "appkit/views/base/actions/base_action";

export default BaseActionView.extend({
  tagName: "li",

  click: function() {
    event.preventDefault();
    if (this.get('controller.__batches.length') < 1) {
      return;
    }
    if (this.get('context.confirm')) {
      return this._showConfirmation();
    } else {
      return this._batchAction();
    }
  },
  actions: {
    confirm: function() {
      this._batchAction();
      return this._super();
    }
  },
  _batchAction: function() {
    this.get('controller').send("baseBatchAction", this.get('context.action'));
    return Ember.View.views["select-all-batches"].set('checked', false);
  }
});
