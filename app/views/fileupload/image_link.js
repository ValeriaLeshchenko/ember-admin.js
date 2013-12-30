export default Ember.View.extend({
  tagName: "a",

  attributeBindings: ["href"],

  href: "#",

  templateName: "fileuploads/link",

  click: function(e) {
    var imageView;
    e.preventDefault();
    imageView = Ember.View.views['FileUploadModal'];
    imageView.set('image', this.get('image'));
    return imageView.$().modal({});
  }
});
