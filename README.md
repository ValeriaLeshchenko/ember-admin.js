[![Build Status](https://travis-ci.org/ember-admin/ember-admin.js.png)](https://travis-ci.org/ember-admin/ember-admin.js)

### Install
Note, Ember-Admin depends bootstrap >= 3.0

js: 
`wget -O ember-admin.min.js http://goo.gl/1v888V` 

css:
`wget -O ember-admin.css http://goo.gl/oGcfNV` 

```
window.App = Admin.create() //Create ember.js app
```

After that you should create controller for your resource and extend it from Admin.ApplicationController.

For example, you have resource Cars. So, you should create CarsController this way:

```
App.CarsController = Admin.ApplicationController.extend()
```


###Please read docs in wiki pages!

###Features(done):
 - Image upload
 - Map integration(google, yandex)
 - Table View
 - Pagination

###Features(in progress):
 - Edit hasMany
 - Scopes
 - Search Form
 - Roles and Permissions
 - File upload
 - Tree view

### To run tests
1. `npm install`
2. `bower install` ( In case you don't have [bower](https://twitter.com/bower) installed - run `npm install -g bower`)
3. `grunt test`
