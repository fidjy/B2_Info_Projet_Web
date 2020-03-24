<template>
  <v-content>
    <v-card class="overflow-hidden height-nav-bar">
      <v-app-bar
        absolute
        color="#3195d7"
        dark
        shrink-on-scroll
        prominent
        src="https://wallpaperaccess.com/full/512858.jpg"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-5"
        scroll-threshold="500"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(89, 171, 227, .9), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-app-bar-nav-icon @click="drawer = true">
          <img class="Account-logo" src="./Assets/baseline_account_circle_black_18dp.png" />
        </v-app-bar-nav-icon>

        <v-toolbar-title>BuberEat</v-toolbar-title>

        <Input labelUber="addresse de livraison"/>

        <Input labelUber="Quel plat voulez-vous ?"/>

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="100vh">
        <v-container class="slot-container" style="height: 100vh;">
          <div class="center-container">
            <slot />
          </div>
        </v-container>
      </v-sheet>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-content>
</template>

<script>
// import axios from "axios";
import Input from "../../components/Input.vue";

export default {
  name: "NavBar",
  components: {
    Input,
  },
  data() {
    return {
      drawer: false,
      address: ""
    };
  }
};
</script>
    
<style>
@import url("Assets/NavBar.scss");
</style>