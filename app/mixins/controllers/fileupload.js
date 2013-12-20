/*
 You can override this method for create your own logic for create asset
 */

var FileUploadMixin = Ember.Mixin.create({

  actions: {

    createAsset: function(asset, property, view) {
      var _this = this;
      return asset.save().then(function() {
        view.set('creating', false);
        view.clearInput();
        if (view.get('single')) {
          return _this._createBelongsTo(asset, property);
        } else {
          return _this._createHasMany(asset, property);
        }
      });
    },

    deleteAsset: function(asset, single, property) {
      asset.deleteRecord();
      asset.save();
      if (single) {
        return this._deleteBelongsTo(asset, property);
      } else {
        return this._deleteHasMany(asset, property);
      }
    }
  },

  _createBelongsTo: function(asset, property) {
    var state;
    this.get("model").set(property, asset);
    if (this.get('model.isDirty')) {
      if (this.get('model.id')) {
        state = DS.RootState.loaded.saved;
        return this.get("model").set('currentState', state);
      }
    }
  },

  _createHasMany: function(asset, property) {
    return this.get("model." + property).pushObject(asset);
  },

  _deleteBelongsTo: function(asset, property) {
    var _this = this;
    return asset.one('didDelete', function() {
      var state;
      _this.get("model").set(property, null);
      if (_this.get('model.isDirty')) {
        state = DS.RootState.loaded;
        return _this.get("model").set('currentState', state.saved);
      }
    });
  },

  _deleteHasMany: function(asset, property) {
    return this.get("model." + property).removeObject(asset);
  }

});

export default FileUploadMixin;
