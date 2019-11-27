/* eslint-disable */
<template>
  <section>
    <button @click="hideForm = !hideForm" class="button is-info">Make a Post!</button>
      <form v-if="hideForm" @submit.prevent="addPost()">
        <b-field label = 'Title'>
          <b-input v-model="post.title" required></b-input>
        </b-field>
        <b-field label = 'Description'>
          <b-input maxlength="300" type="textarea" v-model="post.description"></b-input>
        </b-field>
        <b-field label = 'URL Link'>
          <b-input v-model="post.link" type="url"></b-input>
        </b-field>
        <button class="button is-info">Submit</button>
      </form>
      <pre>{{posts}}</pre>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    hideForm: false,
    post: {
      title: '',
      description: '',
      link: '',
    },
  }),
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  watch: {
    '$route.params.name': function () {
      this.initSubreddit(this.$route.params.name);
    },
    subreddit() {
      if (this.subreddit.id) {
        this.initPost(this.subreddit.id);
      }
    },
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapGetters('subreddit', ['subreddit']),
  },
  methods: {
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPost']),
    async addPost() {
      if (this.post.title && (this.post.description || this.post.link)) {
        await this.createPost(this.post);
      }
    },
  },
};
</script>
