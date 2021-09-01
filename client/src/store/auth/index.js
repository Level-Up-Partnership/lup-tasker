import axios from "axios";
export default {

  state() {
    return {
      isLoggedIn: false,
      userRole: null,
    };
  },
  mutations: {
    CheckIfLoggedIn(state) {
      if (localStorage.getItem("token")) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    CheckUserRole(state, payload) {
      state.userRole = payload.userRole;
    }
  },
  actions: {
    CheckIfLoggedIn(context) {
      context.commit("CheckIfLoggedIn");
    },
    async CheckUserRole(context) {
      await axios
        .get("/checkRole", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          context.commit("CheckUserRole", {
            userRole: res.data.userRole,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  getters: {
    IsLoggedIn(state) {
      return state.isLoggedIn;
    },
    UserRole(state) {
      return state.userRole;
    }
  },
};
