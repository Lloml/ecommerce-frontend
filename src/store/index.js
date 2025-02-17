import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    setToken(state, token) {
      // 变更状态
      state.token = token;
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    }
  },
  actions: {},
  modules: {}
});
