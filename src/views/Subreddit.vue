<template>
  <section>
    <h1>{{subreddit.name}}</h1>
      <form @submit.prevent="addPost()">
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
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    post: {
      title: '',
      description: '',
      link: '',
    },
  }),
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  computed: mapState('subreddit', ['posts', 'subreddit']),
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
