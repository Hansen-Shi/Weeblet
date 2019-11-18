import firebase from '@/firebase';

const state = {
  user: {},
  isLoggedIn: false,
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  async login({ context }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    // eslint-disable-next-line no-console
    console.log(result.user);
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
