//import MetaRoute from "app/dsl/meta_route";

//console.log(MetaRoute);

var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('dashboard', {path: '/'});
  this.resource('posts', function() {
     this.route('new');
  });
});

export default Router;
