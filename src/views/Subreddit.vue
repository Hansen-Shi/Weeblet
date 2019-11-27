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
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
              <br>
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <button class="delete"></button>
        </div>
      </article>
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
    /* eslint-disable */  
    '$route.params.name'() {
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
