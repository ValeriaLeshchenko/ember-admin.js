/*
 This is base controller for use in all views
 If you wont add you action please override this actions
 Or you can use additionalActions property!
 for example:

 In your controller

 additionalActions:(function(){
   [{title: "my action", class: "btn my-action-css", action: "my"}]
 }).property()

 use confirm property for show text in confirmation modal
 action - is an action in your controller which pass model param

 #for batch actions you don't need save model, because save call automatic when all objects

 # for custom breadcrumbs actions you need override
 breadcrumbsActions property and add action title, then add this action into additionalActions property
 */


var BaseActionsMixin = Ember.Mixin.create({
  collectionActions: [
    {
      title: "Edit",
      "class": "btn btn-small btn-primary",
      action: "edit",
      iconClass: "glyphicon glyphicon-pencil"
    }, {
      title: "Show",
      "class": "btn btn-small btn-success",
      action: "show",
      iconClass: "glyphicon glyphicon-info-sign"
    }, {
      title: "Delete",
      confirm: "are you shure to delete this?",
      "class": "btn btn-small btn-danger",
      action: "destroy",
      iconClass: "glyphicon glyphicon-trash"
    }
  ],
  actionNew: (function() {
    return {
      title: "New",
      "class": "btn btn-primary",
      action: "new",
      iconClass: "glyphicon glyphicon-plus"
    };
  }).property('model'),
  breadcrumbsActions: (function() {
    return this.get('__breadcrumbsActionsArray');
  }).property('__breadcrumbsActionsArray'),
  actions: {
    "new": function() {
      return this.transitionToRoute(this._path("new"));
    },
    edit: function(model) {
      return this.transitionToRoute(this._path(model, "edit"));
    },
    update: function(model) {
      return model.save();
    },
    destroy: function(model, batch) {
      if (batch == null) {
        batch = false;
      }
      if (this.get('model.__list')) {
        model.deleteRecord();
        this.get('model.items').removeObject(model);
        if (!batch) {
          this.get('__batches').removeObject(model);
        }
        return model.save();
      } else {
        return this._destroyItem(model);
      }
    },
    show: function(model) {
      return this.transitionToRoute(this._path(model, "show"));
    }
  },
  _destroyItem: function(model) {
    var _this = this;
    model.deleteRecord();
    return model.save().then(function() {
      return _this.transitionToRoute(_this.get('__controller_name'));
    });
  },
  _path: function(model, type) {
    if (type) {
      return "/%@/%@/%@".fmt(this.get('__controller_name'), model.get('id'), type);
    } else {
      return "/%@/%@".fmt(this.get('__controller_name'), model);
    }
  }
});

export default BaseActionsMixin;
