/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { firestoreAction } from 'vuexfire';
import db from '@/db';
import firebase from '@/firebase';

const posts = db.collection('posts');

const state = {
  subreddits: {},
  posts: [],
};

const getters = {
  subreddit: state => (state.subreddits[0] ? state.subreddits[0] : {}),
};

const actions = {
  async createPost({ getters }, post) {
    const result = posts.doc();
    post.id = result.id;
    post.subreddit_id = getters.subreddit.id;
    post.user_id = firebase.auth().currentUser.uid;
    post.created_at = firebase.firestore.FieldValue.serverTimestamp();
    post.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    await posts.doc(post.id).set(post);
  },
  initSubreddit: firestoreAction(({ bindFirestoreRef }, name) => {
    bindFirestoreRef('subreddits', db.collection('subreddits').where('name', '==', name));
  }),
  initPost: firestoreAction(({ bindFirestoreRef }, subreddit_id) => {
    bindFirestoreRef('posts', posts.where('subreddit_id', '==', subreddit_id));
  }),
  async deletePost(_, post_id) {
    await posts.doc(post_id).delete();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
