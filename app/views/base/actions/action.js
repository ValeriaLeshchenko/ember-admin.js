import BaseActionView from "appkit/views/base/actions/base_action";

export default BaseActionView.extend({
  classNameBindings: ["class"],
  attributeBindings: ["title"],
  "class": (function () {
    return this.get('action.class');
  }).property('action'),
  click: function () {
    var model;
    model = this.get('model') || this.get('controller.model');
    if (this.get('action.confirm')) {
      return this._showConfirmation();
    } else {
      return this.get('controller').send(this.get('action.action'), model);
    }
  },
  actions: {
    confirm: function () {
      var model;
      model = this.get('model') || this.get('controller.model');
      this.get('controller').send(this.get('action.action'), model);
      return this._super();
    }
  },
  action: (function () {
    if (this.get('breadcrumbAction')) {
      switch (this.get('breadcrumbAction')) {
        case "new":
          return this.get('controller.actionNew');
        case "edit":
          return this._findAction('Edit');
        case "destroy":
          return this._findAction('Delete');
        case "show":
          return this._findAction('Show');
        default:
          return "";
      }
    } else {
      return this.get('context');
    }
  }).property('context'),
  title: (function () {
    return this.get('action.title');
  }).property('action'),
  _findAction: function (title) {
    return this.get('controller.collectionActions').find(function (action) {
      return action.title === title;
    });
  },
  _findAdditionalActions: function (title) {
    return this.get('controller.__additionalActions').find(function (action) {
      return action.title === title;
    });
  }
});
