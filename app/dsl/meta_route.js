// This module create routes for resources with
// Show Edit New and pagination pages
//
// MetaRoute.map(Router, function(){
//   this.resources("posts")
// });
//

var MetaRoute = (function() {

  function MetaRoute() {}

  MetaRoute.map = function(Router, callback) {
    MetaRoute.Router = Router;
    return callback.call(new MetaRoute());
  };

  MetaRoute.prototype.resources = function(name) {
    var self;
    self = this;
    return MetaRoute.Router.map(function() {
      this.route(name, {
        path: "/" + name
      });
      this.route("" + name + ".edit", {
        path: self._action_edit_path(name)
      });
      this.route("" + name + ".show", {
        path: self._action_show_path(name)
      });
      this.route("" + name + ".new", {
        path: self._new_path(name)
      });
      return this.route("" + name + ".page", {
        path: self._paginationPath(name)
      });
    });
  };

  MetaRoute.prototype._action_show_path = function(name) {
    return "/" + name + "/:id/show";
  };

  MetaRoute.prototype._action_edit_path = function(name) {
    return "/" + name + "/:id/edit";
  };

  MetaRoute.prototype._paginationPath = function(name) {
    return "/" + name + "/page/:page";
  };

  MetaRoute.prototype._new_path = function(name) {
    return "/" + name + "/new";
  };

  return MetaRoute;

})();

export default MetaRoute;



