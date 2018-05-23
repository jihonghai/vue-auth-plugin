import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from "vue";

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;
type Dictionary<T> = { [key: string]: T };

export declare class VueAuth {
  constructor (options?: AuthOptions);

  options: AuthOptions
  app: Vue;
  private watch: Wath;

  check(role: string | string[]) : boolean;
  setUser(user: AuthUser): any;
  setPermissions(permissions: Dictionary<string[]>): any;
  getUser(): AuthUser;
  getPermissions(): Dictionary<string[]>;

  static install: PluginFunction<never>;
}

export interface AuthOptions {
  rolesVar?: string;
}

export interface AuthConfig {
  path: string;
  name?: string;
}

export interface Watch {
  user?: AuthUser;
  permissions?: Dictionary<string[]>
}

export interface AuthUser {
  loginName: string;
  userId: string;
  userName?: string;
  [key: string]: any
}
