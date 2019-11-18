/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
  },
});
