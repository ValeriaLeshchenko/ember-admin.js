export default (function() {

  function Attributes() {}

  Attributes.detect = function(modelType) {
    return this.withId(modelType);
  };

  Attributes.withId = function(modelType) {
    var attrs;
    attrs = this.withoutId(modelType);
    attrs.unshift("id");
    return attrs;
  };

  Attributes.withoutId = function(modelType) {
    var attributes,
      _this = this;
    attributes = [];
    modelType.eachComputedProperty(function(attribute, meta) {
      if (meta.isAttribute && _this.systemAttrs(modelType).indexOf(attribute) < 0) {
        return attributes.push(attribute);
      }
    });
    this.relations(modelType, attributes, false);
    return attributes;
  };

  Attributes.relations = function(modelType, attrs, hasMany) {
    var _this = this;
    if (attrs == null) {
      attrs = [];
    }
    if (hasMany == null) {
      hasMany = true;
    }
    modelType.eachRelationship(function(attribute, meta) {
      if (hasMany) {
        return attrs.push(attribute);
      } else {
        if (meta.kind !== "hasMany") {
          return attrs.push(attribute);
        }
      }
    });
    return attrs;
  };

  Attributes.isBelongsTo = function(modelType, property) {
    var _belongsTo,
      _this = this;
    _belongsTo = false;
    modelType.eachRelationship(function(attribute, meta) {
      if (meta.key === property && meta.kind === "belongsTo") {
        return _belongsTo = true;
      }
    });
    return _belongsTo;
  };

  Attributes.relationForType = function(modelType, relation) {
    var type,
      _this = this;
    type = void 0;
    modelType.eachRelationship(function(attribute, meta) {
      if (meta.key === relation) {
        return type = meta.type;
      }
    });
    return type;
  };

  Attributes.systemAttrs = function(modelType) {
    return ["created_at", "updated_at"];
  };

  return Attributes;

})();