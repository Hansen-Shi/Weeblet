<template>
  <div id="app">
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
           Weeblet
        </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control" v-if="!isLoggedIn">
                <a class="button is-Danger" @click="login()">
                  Login
                </a>
              </p>
              <p class="control" v-if="isLoggedIn">
                <span class="profile">
                  <figure>
                    <img :src="user.image">
                  </figure>
                  <figcaption>{{user.name}}</figcaption>
                </span>
                <a class="button is-primary" @click="logout()">
                  Logout
                </a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    <router-view class = "main container"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['login', 'logout']),
};
</script>

<style lang="scss">
.main {
  margin-top: 2em
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
