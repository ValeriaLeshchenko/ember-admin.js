import Attributes from 'appkit/dsl/attributes';

export default Ember.Mixin.create({

  formAttributes: (function () {
    var attrs = (this.get('model.formFields') || Attributes.withoutId(this.get("model").constructor));
    return attrs.map(function (attr) {
      return {name: attr};
    });
  }).property('modelAttributes.@each'),

  tableAttributes: (function () {
    return this.get('modelAttributes');
  }).property('modelAttributes.@each'),

  fileuploads: (function () {
    if (this.get('model.fileuploads')) {
      this.get('model.fileuploads').map(function (attr) {
        return  {name: attr};
      });
    }
  }).property('model.fileuploads')
});