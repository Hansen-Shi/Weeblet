/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { firestoreAction } from 'vuexfire';
import db from '@/db';

const state = {
  users: [],
};

const getters = {
  grabUsers(state) {
    return state.users.reduce((sortById, user) => {
      sortById[user.id] = user;
      return sortById;
    }, {});
  },
};

const actions = {
  initUsers: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('users', db.collection('users'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
