var PaginationMixin = Ember.Mixin.create({
  __perPage: parseInt($.cookie('perPage')) || 25,

  reloadTable: (function () {
    var options,
      _this = this;
    options = {
      per_page: this.get('__perPage'),
      page: this.get('__page') || 1
    };
    return this.get('store').find(this.get('__model_name'), options).then(function (collection) {
      return _this.set('model.items', collection);
    });
  }).observes('__perPage'),

  actions: {
    changePerPage: function (perPage) {
      $.cookie('perPage', perPage);
      return this.set('__perPage', perPage);
    }
  }
});

export default PaginationMixin;
