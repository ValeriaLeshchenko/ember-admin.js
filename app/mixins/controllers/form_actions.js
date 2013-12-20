var FormActionsMixin = Ember.Mixin.create({
  actions: {
    submit: function(redirect) {
      if (redirect == null) {
        redirect = true;
      }
      if (this.get('model.id')) {
        return this._updateModel(redirect);
      } else {
        return this._createModel(redirect);
      }
    },
    cancel: function() {
      if (this.get('model.isDirty')) {
        this.get('model').rollback();
      }
      return this._redirectToTable();
    }
  },
  _redirectToTable: function() {
    return this.transitionToRoute(this.get('__controller_name'));
  },
  _updateModel: function(redirect) {
    var _this = this;
    return this.get('model').save().then(function() {
      if (redirect) {
        return _this._redirectToTable();
      }
    });
  },
  _createModel: function(redirect) {
    var _this = this;
    return this.get('model').save().then(function() {
      if (redirect) {
        return _this._redirectToTable();
      } else {
        return _this.send('edit', _this.get('model'));
      }
    });
  }
});

export default FormActionsMixin
