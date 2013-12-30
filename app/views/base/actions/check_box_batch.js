
export default Ember.Checkbox.extend({
  selectAll: false,
  pushItem: (function() {
    if (this.get('selectAll')) {
      return this._selectAllAction();
    }
    if (this.get('checked')) {
      return this._addItem(this.get('context'));
    } else {
      return this.get('controller.__batches').removeObject(this.get('context'));
    }
  }).observes('checked'),
  _selectAllAction: function() {
    var _this = this;
    this.set('controller.__batches', []);
    if (!this.get('checked')) {
      return;
    }
    return this.get('controller.model.items').forEach(function(item) {
      return _this._addItem(item);
    });
  },
  _addItem: function(item) {
    if (!(this.get('controller.__batches').indexOf(item) >= 0)) {
      return this.get('controller.__batches').pushObject(item);
    }
  },
  createObserverOnBatch: (function() {
    var _this = this;
    return this.addObserver("controller.__batches.length", this, function() {
      if (_this.get('selectAll')) {
        return;
      }
      if (_this.get('controller.__batches').indexOf(_this.get('context')) >= 0) {
        return _this.set('checked', true);
      } else {
        return _this.set('checked', false);
      }
    });
  }).on('didInsertElement')
});
