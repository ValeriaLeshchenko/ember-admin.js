
//Todo add Logic import

var ControllerMixin = Ember.Mixin.create({
  _getForm: function(controller) {
    var form;
    form = "%@_form".fmt(this._controllerName(controller).decamelize());
    if (Ember.TEMPLATES[form]) {
      return form;
    } else {
      return "form";
    }
  },
  _getControllerTemplate: function(controller) {
    var name;
    name = this._controllerName(controller);
    if (Ember.TEMPLATES[name] || Ember.TEMPLATES["ember-admin/%@".fmt(name)]) {
      return name;
    } else {
      if (this.action && this.action !== "page") {
        return this.action;
      } else {
        return "main";
      }
    }
  },
  _controllerName: function(controller) {
    return controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)|(Page)/, '');
  },
  _setActiveRoute: function(controller) {
    var location, url;
    location = this.container.lookup('location:' + 'hash');
    url = location.getURL();
    url = "/" + url.split("/")[1];
    if (url !== "/") {
      url = "/" + this._controllerName(controller);
    }
    return this.controllerFor("navigation").set('activeMenu', url);
  },
  _setAction: function(action) {
    return this.action = action;
  },
  _checkAction: function(options, target) {
    if (/\./.test(target)) {
      target = target.split(".")[1];
      if (target) {
        return options.action = target;
      }
    }
  },
  _setupBreadscrumbs: function(controller, model) {
    return Admin.Logics.Breadcrumbs.setup(this.action, controller, model, this.controllerFor('breadcrumbs'));
  },
  _setType: function(controller, type) {
    return controller.set('__type', type.toString().replace("Admin.", ""));
  },
  _setSiteTitle: function(controller, model) {
    return Admin.Logics.SiteTile.setup(this._controllerName(controller), model, this.action);
  }
});

export default ControllerMixin;