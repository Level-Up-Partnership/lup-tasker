import { createStore } from "vuex";
import authModule from "./auth/index.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
  },
});
