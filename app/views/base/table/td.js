/*
 if you have own attr for display in relation you should change relations property

 if you have own image property you should change fileuploads property
 */

import Attributes from "appkit/dsl/attributes";

export default Ember.View.extend({

  attributeBindings: ["style"],
  relations: "name title".w(),
  fileuploads: "thumb_url".w(),
  templateName: "base/td",
  tagName: "td",

  createObserves: (function() {
    var _this = this;
    if (this.get('context.fileuploads') && this.get('context.fileuploads').indexOf(this.get('attributeName')) >= 0) {
      this.get('fileuploads').forEach(function(attr) {
        return _this.addObserver("context." + (_this.get('attributeName')) + "." + attr, function() {
          return this.notifyPropertyChange("value");
        });
      });
      return;
    }
    if (Attributes.relations(this.get('context').constructor).indexOf(this.get('attributeName')) >= 0) {
      this.get('relations').forEach(function(attr) {
        return _this.addObserver("context." + (_this.get('attributeName')) + "." + attr, _this, function() {
          return this.notifyPropertyChange("value");
        });
      });
      return;
    }
    return this.addObserver("context." + (this.get('attributeName')), this, function() {
      return this.notifyPropertyChange("value");
    });
  }).on('didInsertElement'),

  value: (function() {
    var record;
    record = this.get(this.path());
    if (typeof record !== "object") {
      return record;
    }
    return this.relation(record, this.get('attributeName'));
  }).property("context"),

  image_object: (function() {
    return this.get("context." + (this.get('attributeName')));
  }).property('value'),

  color: (function() {
    if (this.get('attributeName').match(/color/)) {
      this.set('text', true);
      return this.set('style', "color: " + (this.get('_value')) + ";");
    }
  }).property('value'),

  image: (function() {
    if (this.get('context.fileuploads') && this.get('context.fileuploads').indexOf(this.get('attributeName')) >= 0) {
      this.set('text', false);
      return true;
    }
  }).property('value'),

  text: (function() {
    return true;
  }).property('value'),

  path: function() {
    return "context.%@".fmt(this.get('attributeName'));
  },

  relation: function(record) {
    var value,
      _this = this;
    if (!record) {
      return;
    }
    value = "";
    if (this.get('context.fileuploads') && this.get('context.fileuploads').indexOf(this.get('attributeName')) >= 0) {
      this.get('fileuploads').forEach(function(attr) {
        if (record.get(attr)) {
          return value = record.get(attr);
        }
      });
    }
    if (Attributes.relations(this.get('context').constructor).indexOf(this.get('attributeName')) >= 0) {
      this.get('relations').forEach(function(attr) {
        if (record.get(attr)) {
          return value = record.get(attr);
        }
      });
    }
    return value;
  }
});
