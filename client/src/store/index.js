import { createStore } from "vuex";
import authModule from "./auth/index.js";
import timerModule from "./timer/index.js"

/**
 * Vuex Store which holds our modules, this is a global store which any vue instance can access if called
 */
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    timerModule,
  },
});
