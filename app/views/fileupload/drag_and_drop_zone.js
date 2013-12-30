import Attributes from "appkit/dsl/attributes";

export default Ember.View.extend({

  attributeBindings: ["property", "assetTemplate"],

  assetTemplate: "fileuploads/asset",

  templateName: "fileuploads/drag_and_drop_zone",

  didInsertElement: function() {
    return this.get('single');
  },

  single: (function() {
    return Attributes.isBelongsTo(this.get("context.model").constructor, this.get('property'));
  }).property('context'),

  assets: (function() {
    Ember.defineProperty(this, "_assets", Ember.computed(function() {
      return this.get("context." + (this.get('property')));
    }).property("context." + (this.get('property'))));
    return this.get('_assets');
  }).property('_assets'),

  asset: (function() {
    Ember.defineProperty(this, "_asset", Ember.computed(function() {
      return this.get("context." + (this.get('property')));
    }).property("context." + (this.get('property'))));
    return this.get('_asset');
  }).property('_asset'),

  actions: {
    selectFile: function() {
      var file, files, _i, _len, _results;
      files = event.target.files;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.createAsset(file));
      }
      return _results;
    }
  },

  drop: function(e) {
    var file, files, _i, _len, _results;
    e.stopPropagation();
    e.preventDefault();
    files = e.dataTransfer.files;
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      _results.push(this.createAsset(file));
    }
    return _results;
  },

  dragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
    return e.dataTransfer.dropEffect = 'copy';
  },

  dragLeave: function(e) {
    e.stopPropagation();
    return e.preventDefault();
  },

  dragEnter: function(e) {
    e.stopPropagation();
    return e.preventDefault();
  },

  createAsset: function(file) {
    this.set('creating', true);
    if (this.get('single')) {
      if (this.get("controller.model." + (this.get('property')))) {
        this.get("controller.model." + (this.get('property'))).deleteRecord();
        this.get("controller.model." + (this.get('property'))).save();
      }
      return this._createAsset(this._params(file), file);
    } else {
      return this._createAsset(this._params(file), file);
    }
  },

  _createAsset: function(params, file) {
    var asset, assetType, type;
    type = this.get('context.model').constructor;
    assetType = Attributes.relationForType(type, this.get('property'));
    asset = this.get('controller.store').createRecord(assetType, params);
    asset.set('file', file);
    return this.get('controller').send("createAsset", asset, this.get('property'), this);
  },

  _params: function(file) {
    var params;
    params = {
      assetable_type: this.get('controller.__type'),
      content_type: file.type,
      original_filename: file.name,
      is_main: true
    };
    if (this.get('context.id')) {
      params.assetable_id = this.get('context.id');
    }
    if (!this.get('single')) {
      params.is_main = false;
    }
    return params;
  },

  clearInput: function() {
    return this.$().find("input[type=file]").val('');
  }

});
