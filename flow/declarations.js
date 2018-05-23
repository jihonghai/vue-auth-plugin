declare var document: Document;

declare type Dictionary<T> = { [key: string]: T };

declare type AuthOptions = {
  rolesVar?: string;
}

declare type AuthConfig = {
  path: string;
  name?: string;
}

declare type Watch = {
  user?: AuthUser;
  permissions?: Dictionary<any>
}

declare type AuthUser = {
  loginName: string;
  userId: string;
  userName?: string;
  [key: string]: any
}
