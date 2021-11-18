import axios from "axios";
export default {
    //Holds our data
    state() {
        return {
            isNotRunning: true,
        };
    },
    //holds the methods to check if the timer is running and set to true or false
    mutations: {
        isRunning(state) {
            state.isNotRunning = false;
        },
        isNotRunning(state) {
            state.isNotRunning = true;
        },
    },
    //Pass on the method so the frontend can call it 
    actions: {
        isRunning(context) {
            context.commit("isRunning");
        },
        isNotRunning(context) {
            context.commit("isNotRunning");
        },

    },
    //Get the data and see if it returns a true or false
    getters: {
        isNotRunning(state) {
            return state.isNotRunning;
        },
    },
};
