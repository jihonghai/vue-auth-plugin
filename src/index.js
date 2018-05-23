/* @flow */

import { install } from './install'
import { inBrowser } from './util/dom'

export default class VueAuth {
  static install: () => void;
  static version: string;

  app: any;
  apps: Array<any>;
  options: AuthOptions;
  watch: Watch;

  constructor (options: AuthOptions = {}) {
    this.app = null
    this.apps = []
    this.options = options
    this.watch = {
    }
  }

  init (app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' && assert(
      install.installed,
      `not installed. Make sure to call \`Vue.use(VueAuth)\` ` +
      `before creating root instance.`
    )

    this.apps.push(app)

    // main app already initialized.
    if (this.app) {
      return
    }

    this.app = app
  }

  check (permission: string | string[]): boolean {
    return true
  }

  setUser(user: AuthUser): any {
    this.watch.user = user
  }

  setPermissions(permissions: Dictionary<string[]>): any {
    this.watch.permissions = permissions
  }

  getUser(): AuthUser {
    return this.watch.user
  }

  getPermissions(): Dictionary<string[]>  {
    return this.watch.permissions
  }
}

VueAuth.install = install
VueAuth.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(VueAuth)
}
