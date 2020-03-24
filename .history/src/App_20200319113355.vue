<template>
  <v-app>
    <v-content>
      <component :is="layout">
        <transition name="slide-fade" appear mode="out-in">
          <router-view></router-view>
        </transition>
      </component>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "./components/NavBar.vue";

export default Vue.extend({
  name: "App",

  computed: {
    layout() {
      return this.$route.meta.layout || "DefaultLayout";
    },

  data: () => ({
    //
  })
});
</script>

<style>
html {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>