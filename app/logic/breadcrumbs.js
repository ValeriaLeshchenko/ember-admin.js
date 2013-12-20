
//Todo import Config

var Breadcrumbs = Ember.Object.extend();

Breadcrumbs.reopenClass({
  setup: function(action, controller, model, breadcrumbs_controller) {
    var content, name, obj;
    content = [];
    obj = Ember.Object.create({
      name: "dashboard",
      url: this._url("#/"),
      "class": "first",
      active: false
    });
    content.pushObject(obj);
    obj = Ember.Object.create({
      name: controller.get('__controller_name'),
      url: this._url("#/" + (controller.get('__controller_name'))),
      "class": "active",
      active: true
    });
    if (action && action !== "page") {
      obj.set('class', "");
      obj.set('active', false);
      content.pushObject(obj);
      name = model.get('id') || action;
      obj = Ember.Object.create({
        name: name,
        "class": "active",
        active: true
      });
      content.pushObject(obj);
    } else {
      content.pushObject(obj);
    }
    breadcrumbs_controller.set('content', content);
    return this._actions(action, controller);
  },
  _url: function(url) {
    if (Admin.Logics.Config.get('namescpace')) {
      return "/%@%@".fmt(Admin.Logics.Config.get('namescpace'), url);
    } else {
      return url;
    }
  },
  _actions: function(action, controller) {
    var actions;
    actions = [];
    switch (action) {
      case "edit":
        actions.push(this._createAction());
        actions.push(this._showAction());
        actions.push(this._destroyAction());
        break;
      case "show":
        actions.push(this._createAction());
        actions.push(this._editAction());
        actions.push(this._destroyAction());
        break;
      default:
        actions.push(this._createAction());
    }
    return controller.set("__breadcrumbsActionsArray", actions);
  },
  _createAction: function() {
    return "new";
  },
  _editAction: function() {
    return "edit";
  },
  _destroyAction: function() {
    return "destroy";
  },
  _showAction: function() {
    return "show";
  }
});

export default Breadcrumbs;
