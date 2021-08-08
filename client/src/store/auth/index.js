export default {
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    CheckIfLoggedIn(state) {
      if (localStorage.getItem("token")) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    }
  },
  actions: {
    CheckIfLoggedIn(context) {
      context.commit("CheckIfLoggedIn");
    }
  },
  getters: {
    IsLoggedIn(state) {
      return state.isLoggedIn;
    }
  },
};
