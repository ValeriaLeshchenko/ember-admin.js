import PaginationMixin from "appkit/mixins/routes/pagination";
import ModelMixin      from "appkit/mixins/routes/model";
import ControllerMixin from "appkit/mixins/routes/controller";
import Attributes      from "appkit/dsl/attributes";

export default Ember.Route.extend(PaginationMixin, ModelMixin, ControllerMixin, {
  model: function(options, transition) {
    this.action = void 0;
    this.page = void 0;
    this.modelName = this._modelName(transition.targetName);
    this._checkAction(options, transition.targetName);
    if (options.action) {
      this._setAction(options.action);
    }
    this._setPage(options.page);
    var moduleName = "%@/models/%@".fmt("appkit", this.modelName);

    try{
      require(moduleName, null, null, true /* force sync */);
      return this._find_model(this.modelName, options);
    }
    catch (e) {
      // model doesn't exist
    }
  },
  setupController: function(controller, model) {
    var type;
    this._setSiteTitle(controller, model);
    if (model) {
      this._setModel(controller, model);
      type = model.type || model.constructor;
      this._setType(controller, type);
      this._setupPaginationInfo(controller);
      controller.set('modelAttributes', Attributes.detect(type));
      return controller.set('batches', []);
    }
  },
  renderTemplate: function(controller, model) {
    this._setActiveRoute(controller);
    this._setupBreadscrumbs(controller, model);
    this.render(this._getControllerTemplate(controller), {
      outlet: "main",
      controller: controller
    });
    this._renderNavigation(controller, model);
    this.controllerFor('breadcrumbs').set('resource', model);
    this._renderBreadcrumbs(controller, model);
    this._renderActions(controller, model);
    return this._renderForm(controller, model);
  },
  _renderNavigation: function(controller, model) {
    return this.render('navigation', {
      outlet: 'navigation',
      controller: 'navigation'
    });
  },
  _renderBreadcrumbs: function(controller, model) {
    return this.render('breadcrumbs', {
      outlet: 'breadcrumbs',
      controller: 'breadcrumbs'
    });
  },
  _renderActions: function(controller, model) {
    if (model) {
      return this.render('actions', {
        outlet: 'actions',
        controller: controller
      });
    }
  },
  _renderForm: function(controller, model) {
    if (this.action && (this.action === "edit" || this.action === "new")) {
      return this.render(this._getForm(controller), {
        into: this.action,
        outlet: 'form',
        controller: controller
      });
    }
  }
});
