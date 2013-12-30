export default Ember.View.extend({
  actions: {
    confirm: function() {
      return Ember.View.views["ActionModal"].$().modal('hide');
    }
  },
  _showConfirmation: function() {
    var action, modalView;
    action = this.get('action') || this.get('context');
    modalView = Ember.View.views["ActionModal"];
    modalView.set('action', action);
    modalView.set('target', this);
    return modalView.$().modal({});
  }
});
