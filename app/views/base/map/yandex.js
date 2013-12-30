import AbstractMapView from "appkit/views/map/abstract";

export default AbstractMapView.extend({
  mapType: 'asYandexMap',

  didInsertElement: function() {
    var self,
      _this = this;
    self = this;
    console.log(ymaps);
    return ymaps.ready(function() {
      return _this.initMap.call(self);
    });
  },

  initMap: function() {
    var map;
    map = new ymaps.Map('map_container', {
      center: this.get('center'),
      zoom: this.get('zoom')
    });
    this.initMarker(map);
    map.controls.add('zoomControl', {
      left: 5,
      top: 5
    }).add('typeSelector').add('mapTools', {
        left: 35,
        top: 5
      });
    return this.initAutocomplete();
  },

  center: (function() {
    return this.centerCoords();
  }).property(),

  initMarker: function(map) {
    var mark,
      _this = this;
    mark = new ymaps.Placemark(this.get('center'), {
      iconContent: '1',
      balloonContent: '',
      hintContent: ''
    }, {
      preset: 'twirl#violetIcon',
      draggable: true
    });
    map.geoObjects.add(mark);
    return mark.events.add("dragend", function(e) {
      return _this.setAttrs(mark.geometry.getCoordinates());
    });
  },

  initAutocomplete: function(map, marker) {
    var autocompleteView, input;
    autocompleteView = this.get('MapAutocomplete');
    return input = autocompleteView.$().hide();
  }
});
