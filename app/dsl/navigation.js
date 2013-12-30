var Navigation = (function() {

  function Navigation(container, parentId) {
    this.parentId = parentId;
    this.container = container || [];
  }

  Navigation.content = [];

  Navigation.map = function(callback) {
    var navigation = new Navigation();
    callback.call(navigation);
    return this.content = navigation.container;
  };

  Navigation.prototype.navigate = function(title, options, callback) {
    var emberObject, navigateObject;
    navigateObject = {
      title: title,
      children: [],
      divider: false,
      id: this._uid()
    };
    if (this.parentId) {
      navigateObject.parentId = this.parentId;
    }
    if (options && typeof options !== 'function') {
      navigateObject = $.extend(navigateObject, options);
    }
    this._makeRoute(navigateObject);
    this._makeUrl(navigateObject);
    emberObject = Ember.Object.create(navigateObject);
    this.container.push(emberObject);
    if (typeof options === 'function') {
      callback = options;
    }
    if (callback) {
      emberObject.set('hasChildren', true);
      callback.call(new Navigation(emberObject.get('children'), emberObject.get('id')));
    }
    return this.container;
  };

  Navigation.prototype._makeRoute = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.route === void 0) {
      return options.route = options.title.underscore();
    }
  };

  Navigation.prototype._makeUrl = function(options) {
    if (options == null) {
      options = {};
    }
    if (!options.url) {
      return options.url = "#/%@".fmt(options.route);
    }
  };

  Navigation.prototype._uid = function() {
    return Math.random().toString(36).substr(2, 9);
  };

  Navigation.findParent = function(obj) {
    var _this = this;
    return this.content.find(function(item) {
      return item.id === obj.parentId;
    });
  };

  return Navigation;

})();
export default Navigation;
