<template>
  <v-app>
    <v-content>
      <NavBar />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    NavBar
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