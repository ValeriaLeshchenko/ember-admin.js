export default Ember.Mixin.create({
  createRecord: function(store, type, record) {
    var adapter, url;
    url = this.buildURL(type.typeKey);
    adapter = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data, request, str,
        _this = this;
      data = {};
      data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record, {
        includeId: true
      });
      if (record["_excludeParams"]) {
        str = $.param(record._excludeParams(data[type.typeKey]));
      } else {
        str = $.param(data[type.typeKey]);
      }
      url = "%@?%@".fmt(url, str);
      data.context = adapter;
      request = new window.XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader('Content-Type', record.get('content_type'));
      request.onreadystatechange = function() {
        if (request.readyState === 4 && (request.status === 201 || request.status === 200)) {
          data = JSON.parse(request.response);
          return Ember.run(null, resolve, data);
        }
      };
      return request.send(record.get('file'));
    });
  }
});
