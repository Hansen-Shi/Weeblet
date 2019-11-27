/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { firestoreAction } from 'vuexfire';
import db from '@/db';

const posts = db.collection('posts');

const state = {
  subreddit: {},
  posts: [],
};

const actions = {
  async createPost(post) {
    const result = posts.doc();
    post.id = result.id;
    await posts.doc(post.id).set(post);
  },
  initSubreddit: firestoreAction(({ bindFirestoreRef }, name) => {
    bindFirestoreRef('subreddit', db.collection('subreddits').where('name', '==', name));
  }),
  initPost: firestoreAction(({ bindFirestoreRef }, subreddit_id) => {
    bindFirestoreRef('posts', db.collection('posts').where('subreddit_id', '==', subreddit_id));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
