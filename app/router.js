import MetaRoute from "appkit/dsl/meta_route";

var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('dashboard', {path: '/'});
});

MetaRoute.map(Router, function() {
  this.resources("products");
});

export default Router;
