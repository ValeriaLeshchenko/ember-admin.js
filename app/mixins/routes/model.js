var ModelMixin = Ember.Mixin.create({
  _find_model: function(modelName, options) {
    if (options.action === "new") {
      return this.store.createRecord(modelName, {});
    }
    if (!options.id) {
      return this.pagination(modelName, "_page=1");
    }
    if (this._checkPaginations()) {
      return this.pagination(modelName, options.id);
    }
    return this.store.find(modelName, options.id);
  },
  _setModel: function(controller, model) {
    if (!model) {
      return;
    }
    if (model.type) {
      return controller.set('model', Ember.Object.create({
        items: model,
        __list: true
      }));
    }
    return controller.set('model', model);
  },
  _modelName: function(name) {
    if (/\./.test(name)) {
      name = name.split(".")[0];
    }
    return Ember.String.singularize(name);
  }
});

export default ModelMixin;
