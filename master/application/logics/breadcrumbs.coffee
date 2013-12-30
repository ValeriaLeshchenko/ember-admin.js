Admin.Logics.Breadcrumbs = Ember.Object.extend()

Admin.Logics.Breadcrumbs.reopenClass
  setup: (action, controller, model, breadcrumbs_controller) ->
    content = []
    obj = Ember.Object.create({name: "dashboard", url: @_url("#/"), class: "first", active: false})
    content.pushObject(obj)
    obj = Ember.Object.create({name: controller.get('__controller_name'), url: @_url("#/#{controller.get('__controller_name')}"), class: "active", active: true})
    if action && action != "page"
      obj.set('class', "")
      obj.set('active', false)
      content.pushObject(obj)
      name = (model.get('id') || action)
      obj = Ember.Object.create({name: name, class: "active", active: true})
      content.pushObject(obj)
    else
      content.pushObject(obj)
    breadcrumbs_controller.set('content', content)
    @_actions(action, controller)

  _url: (url) ->
    if Admin.Logics.Config.get('namescpace')
      "/%@%@".fmt(Admin.Logics.Config.get('namescpace'), url)
    else
      url

  _actions: (action, controller) ->
    actions = []
    switch action
      when "edit"
        actions.push(@_createAction())
        actions.push(@_showAction())
        actions.push(@_destroyAction())
      when "show"
        actions.push(@_createAction())
        actions.push(@_editAction())
        actions.push(@_destroyAction())
      else
        actions.push(@_createAction())

    controller.set("__breadcrumbsActionsArray", actions)

  _createAction: ->
    "new"

  _editAction: ->
    "edit"

  _destroyAction: ->
    "destroy"

  _showAction: ->
    "show"
