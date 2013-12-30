import AbstractMapView from "appkit/views/map/abstract";

export default AbstractMapView.extend({

  mapType: 'asGoogleMap',

  initialize: (function() {
    var map, marker, options,
      _this = this;
    options = {
      zoom: this.get('zoom'),
      center: this.get('center'),
      mapTypeId: this.get('mapTypeId')
    };
    map = new google.maps.Map(this.$().find(".map")[0], options);
    marker = this.initMarker(map);
    this.initAutocomplete(map, marker);
    return google.maps.event.addListener(map, 'zoom_changed', function() {
      return _this.setZoom(map.getZoom());
    });
  }).on('didInsertElement'),

  center: (function() {
    var coord;
    coord = this.centerCoords();
    return new google.maps.LatLng(coord[0], coord[1]);
  }).property(),

  mapTypeId: (function() {
    return google.maps.MapTypeId.ROADMAP;
  }).property(),

  initMarker: function(map) {
    var marker, options,
      _this = this;
    options = {
      position: this.get('center'),
      map: map,
      draggable: true
    };
    marker = new google.maps.Marker(options);
    google.maps.event.addListener(marker, 'dragend', function(event) {
      var pos;
      map.setCenter(event.latLng);
      pos = marker.getPosition();
      return _this.setAttrs(pos);
    });
    return marker;
  },

  initAutocomplete: function(map, marker) {
    var autocomplete, autocompleteView, input,
      _this = this;
    autocompleteView = this.get('MapAutocomplete');
    input = autocompleteView.$()[0];
    autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode']
    });
    return google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place, pos;
      place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      pos = place.geometry.location;
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(pos);
        map.setZoom(17);
      }
      marker.setPosition(pos);
      return _this.setAttrs(pos);
    });
  }
});
