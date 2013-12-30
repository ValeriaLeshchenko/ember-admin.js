import BaseActionView from "appkit/views/base/base_action";

export default BaseActionView.extend({
  attributeBindings: ["templateName", 'property'],
  actions: {
    deleteAsset: function() {
      return this._showConfirmation();
    },
    confirm: function() {
      this._deleteAsset(this.get('asset'), this.get('parentView.single'));
      return this._super();
    }
  },
  _deleteAsset: function(asset, single) {
    return this.get('controller').send('deleteAsset', asset, single, this.get('property'));
  },
  action: (function() {
    return {
      title: 'Delete',
      confirm: "Are you shure delete this?"
    };
  }).property()
});
