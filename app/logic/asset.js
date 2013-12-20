import App from 'appkit/app';
import FileuploadAdapter from 'appkit/adapters/fileupload';

var Asset = DS.Model.extend({
  original_filename: DS.attr('string'),
  content_type: DS.attr('string', {
    defaultValue: ""
  }),
  guid: DS.attr('string', {
    defaultValue: ""
  }),
  assetable_id: DS.attr('string'),
  assetable_type: DS.attr('string'),
  thumb_url: DS.attr('string'),
  url: DS.attr('string'),
  type: DS.attr('string', {
    defaultValue: "Asset"
  }),
  is_main: DS.attr('boolean', {
    defaultValue: false
  })
});

Asset.reopenClass({
  extend: function(obj) {
    var adapter, name;
    name = obj.type._meta.options.defaultValue;
    adapter = "App.%@Adapter = App.ApplicationAdapter.extend(FileuploadAdapter)".fmt(name);
    eval(adapter);
    return this._super.apply(this, arguments);
  }
});
