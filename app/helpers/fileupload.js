Ember.Handlebars.registerHelper("fileupload", function(property, options) {
  options.hash.inputOptions = Ember.copy(options.hash);
  options.hash.property = property;
  return Ember.Handlebars.helpers.view.call(this, Admin.Fileupload.DragAndDropZoneView, options);
});

Ember.Handlebars.registerBoundHelper("bound-fileupload", function(property, options) {
  options.hash.inputOptions = Ember.copy(options.hash);
  options.hash.property = property;
  return Ember.Handlebars.helpers.view.call(this, Admin.Fileupload.DragAndDropZoneView, options);
});
