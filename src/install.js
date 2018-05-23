export let _Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) {
    return
  }
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.auth)) {
        this._authRoot = this
        this._auth = this.$options.auth
        this._auth.init(this)
      } else {
        this._routerRoot = (this.$parent && this.$parent._authRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$auth', {
    get () { return this._authRoot._auth }
  })
}
