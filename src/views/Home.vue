<template>
  <div class="home">
    <button class="button is-danger">Google Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'home',
  methods: mapActions('auth', [login]),
};
</script>
