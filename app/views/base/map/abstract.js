import Config from "appkit/logic/config";

export default Ember.View.extend({
  templateName: "base/geo",

  lan: (function() {
    return this.get("context." + (this.get('lanAttr')));
  }).property(),

  setLan: function(value) {
    return this.get('context').set(this.get('lanAttr'), value);
  },

  lanAttr: (function() {
    return this.get("context." + (this.get('mapType')))[0];
  }).property(),

  lng: (function() {
    return this.get("context." + (this.get('lngAttr')));
  }).property(),

  lngAttr: (function() {
    return this.get("context." + (this.get('mapType')))[1];
  }).property(),

  setLng: function(value) {
    return this.get('context').set(this.get('lngAttr'), value);
  },

  zoom: (function() {
    return this.get("context." + (this.get('zoomAttr'))) || 8;
  }).property(),

  zoomAttr: (function() {
    return this.get("context." + (this.get('mapType')))[2];
  }).property(),

  setZoom: function(value) {
    return this.get('context').set(this.get('zoomAttr'), value);
  },

  centerCoords: function() {
    if (this.get('lan') && this.get('lng')) {
      return [this.get('lan'), this.get('lng')];
    } else {
      return Config.get('mapCenter').split(",");
    }
  },

  setAttrs: function(pos) {
    if (pos['push']) {
      this.setLan(pos[0]);
      return this.setLng(pos[1]);
    } else {
      this.setLan(pos.ob);
      return this.setLng(pos.pb);
    }
  }
});
