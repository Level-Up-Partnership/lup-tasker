import axios from "axios";
export default {

  state() {
    return {
      isLoggedIn: false,
      userRole: null,
    };
  },
  mutations: {
    //Check if the user is logged in by checking if they have a token
    CheckIfLoggedIn(state) {
      if (localStorage.getItem("token")) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    //Check the user role 
    CheckUserRole(state, payload) {
      state.userRole = payload.userRole;
    }
  },
  actions: {
    CheckIfLoggedIn(context) {
      context.commit("CheckIfLoggedIn");
    },
    //Check the user role by calling a backend call and see if they're an admin or not
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
    //Get to see if they're logged in
    IsLoggedIn(state) {
      return state.isLoggedIn;
    },
    //Get to see if the user is an admin or not
    UserRole(state) {
      return state.userRole;
    }
  },
};
