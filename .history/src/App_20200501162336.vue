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
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

Vue.config.productionTip = false;

import axios from 'axios';
axios.defaults.baseURL = 'https://localhost:8000';

$cookies.set("log", false);

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
