/*!
  * vue-auth v0.0.1
  * (c) 2018 jihonghai
  * @license MIT
  */
'use strict';

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) {
    return
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.auth)) {
        this._authRoot = this;
        this._auth = this.$options.auth;
        this._auth.init(this);
      } else {
        this._routerRoot = (this.$parent && this.$parent._authRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$auth', {
    get: function get () { return this._authRoot._auth }
  });
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

var VueAuth = function VueAuth (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.watch = {
  };
};

VueAuth.prototype.init = function init (app /* Vue component instance */) {
  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueAuth)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;
};

VueAuth.prototype.check = function check (permission) {
  return true
};

VueAuth.prototype.setUser = function setUser (user) {
  this.watch.user = user;
};

VueAuth.prototype.setPermissions = function setPermissions (permissions) {
  this.watch.permissions = permissions;
};

VueAuth.prototype.getUser = function getUser () {
  return this.watch.user
};

VueAuth.prototype.getPermissions = function getPermissions (){
  return this.watch.permissions
};

VueAuth.install = install;
VueAuth.version = '0.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueAuth);
}

module.exports = VueAuth;
