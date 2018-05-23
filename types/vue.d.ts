/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import VueAuth from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $auth: VueAuth;
  }
}
