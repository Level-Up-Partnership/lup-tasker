import { createStore } from "vuex";
import authModule from "./auth/index.js";
import timerModule from "./timer/index.js"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    timerModule,
  },
});
