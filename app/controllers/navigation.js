import Navigation from 'appkit/dsl/navigation';
import Config from 'appkit/logic/config';

export default  Ember.ArrayController.extend({
  activeMenu: "dashboard",

  content: (function() {
    return Navigation.content;
  }).property(),

  siteTitle: Config.siteTitle

});
