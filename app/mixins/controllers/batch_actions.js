var BatchActionsMixin = Ember.Mixin.create({
  __batches: [],
  batchActions: [
    {
      title: "delete",
      confirm: "Are you sure to delete this?",
      action: "destroy"
    }
  ],
  actions: {
    baseBatchAction: function(action) {
      var _this = this;
      this.get('__batches').forEach(function(model) {
        return _this.send(action, model, true);
      });
      return this.set('__batches', []);
    }
  }
});

export default BatchActionsMixin;
