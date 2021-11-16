import axios from "axios";
export default {

    state() {
        return {
            isNotRunning: true,
        };
    },
    mutations: {
        isRunning(state) {
            state.isNotRunning = false;
        },
        isNotRunning(state) {
            state.isNotRunning = true;
        },
    },
    actions: {
        isRunning(context) {
            context.commit("isRunning");
        },
        isNotRunning(context) {
            context.commit("isNotRunning");
        },

    },
    getters: {
        isNotRunning(state) {
            return state.isNotRunning;
        },
    },
};
