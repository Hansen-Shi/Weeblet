<template>
  <section>
    <button @click="hideForm = !hideForm" class="button is-info">Make a Post!</button>
      <form v-if="!hideForm" @submit.prevent="addPost()">
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
      <div class="posts columns is-multiline">
        <div class="card column is-4" v-for="post in posts" :key="post.id">
          <div class="card-image" v-if="isImage(post.link)">
            <figure class>
              <img :src="post.link" alt="Post image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4" v-if="!post.link">{{post.title}}</p>
                <p class="title is-4" v-if="post.link">
                  <a :href="post.link" target="_blank">{{post.title}}</a></p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div class="content">
              {{post.description}}
              <br>
              <time datetime="2016-1-1">{{post.created_at}}</time>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    hideForm: true,
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
    isImage(url){
      return url.match(/png|jpg|jpeg|gif/)
    },
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPost']),
    async addPost() {
      if (this.post.title && (this.post.description || this.post.link)) {
        this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          link: '',
        }
        this.hideForm = true;
      }
    },
  },
};
</script>

<style>
  .posts {
    margin-top: 2em;
  }
</style>
