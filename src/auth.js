/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import firebase from '@/firebase';
import store from '@/store';
import db from '@/db';
import router from '@/router';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.user) {
      user = user.user;
    }
    const setUser = {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection('users').doc(setUser.id).set(setUser);
    store.commit('auth/setUser', setUser);
    router.push('/Subreddits');
  } else {
    store.commit('auth/setUser', null);
  }
});