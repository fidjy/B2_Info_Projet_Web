<template>
  <v-app>
    <component :is="layout">
      <transition name="slide-fade" appear mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
Vue.use(require('vue-cookies'));

export default Vue.extend({
  name: "App",

  computed: {
    layout() {
      return this.$route.meta.layout || "NavBar";
    }
  }
});
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0%;
}
</style>