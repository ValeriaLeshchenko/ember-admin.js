import Resolver from 'resolver';

var AdminResolver = Resolver.default.extend({

  resolveRoute: function (parsedName){
    var moduleName = "%@/routes/main".fmt(this.namespace.modulePrefix);
    this.useRouterNaming(parsedName);
    if (this.resolveOther(parsedName)){
        return this.resolveOther(parsedName);
    }
    else {
        if(!this._checkRouteName(parsedName.fullName)){
          var module = require(moduleName, null, null, true /* force sync */);
          if (module['default']) { module = module['default']; }
          return module;
        }
    }
  },

  resolveController: function(parsedName){
    this.useRouterNaming(parsedName);
    if (this._checkResourceController(parsedName.fullName)){
      this._setNames(parsedName);
    }
    if (this.resolveOther(parsedName)){
      return this.resolveOther(parsedName);
    }
    else {
      var moduleName = "%@/controllers/application".fmt(this.namespace.modulePrefix);
      var module = require(moduleName, null, null, true /* force sync */);
      if (module['default']) { module = module['default']; }
      return module;
    }
  },

  _checkRouteName: function(name){
      return 'route:application route:basic route:loading route:error'.w().indexOf(name) >= 0;
  },

  _checkResourceController: function (name){
      return this._pattern().test(name);
  },

  _replaceForResource: function(name){
     return name.replace(this._pattern(), '');
  },

  _setNames: function(parsedName){
    parsedName.fullName = this._replaceForResource(parsedName.fullName);
    parsedName.fullNameWithoutType = this._replaceForResource(parsedName.fullNameWithoutType);
    parsedName.name = this._replaceForResource(parsedName.name);
  },

  _pattern: function(){
    return /(Show)|(Edit)|(New)|(Page)/;
  }
});


var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: AdminResolver

});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

export default App;
