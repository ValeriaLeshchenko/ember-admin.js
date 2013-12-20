// Add logic

var PaginationMixin = Ember.Mixin.create({
  pagination: function(modelName) {
    var perPage;
    perPage = $.cookie('perPage') || 25;
    return this.store.find(modelName, {
      page: this.page,
      per_page: perPage
    });
  },
  _checkPaginations: function() {
    return this.action === "page";
  },
  _setPage: function(page) {
    return this.page = parseInt(page) || 1;
  },
  _setupPaginationInfo: function(controller) {
    controller.set('__page', this.page);
    controller.set('__controller_name', this._controllerName(controller));
    controller.set('__model_name', this.modelName);
    return Admin.Logics.Pagination.setup(controller, this.page);
  }
});

export default PaginationMixin;