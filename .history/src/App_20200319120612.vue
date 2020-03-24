<template>
  <v-app>
    <v-content>
      <component :is="layout">
        <transition name="slide-fade" appear mode="out-in">
          <router-view></router-view>
        </transition>
      </component>
    </v-content>
                     <p>home</p>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  computed: {
    layout() {
      return this.$route.meta.layout || "NavBar";
    },
  }
});
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin:0%;
}
</style>