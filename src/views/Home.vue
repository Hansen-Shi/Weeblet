<template>
  <div class="home">
    <button class="button is-danger" @click="login()">Google Login</button>
    <button class="button is-danger" @click="logout()">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'home',
  methods: mapActions('auth', ['login', 'logout']),
};
</script>
