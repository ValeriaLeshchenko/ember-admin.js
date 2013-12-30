import MetaRoute from "appkit/dsl/meta_route";

import Navigation from 'appkit/dsl/navigation';

Navigation.map(function(){
  this.navigate("Dashboard", {route: ""});
  this.navigate("models", function(){
    this.navigate("products")
  });
});


var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('dashboard', {path: '/'});
});

MetaRoute.map(Router, function() {
  this.resources("products");
});

export default Router;
