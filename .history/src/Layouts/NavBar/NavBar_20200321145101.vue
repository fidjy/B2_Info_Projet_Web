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
        class="app-bar"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(89, 171, 227, .9), rgba(25,32,72,.7)"></v-img>
        </template>

        <div class="header">
          <v-app-bar-nav-icon @click="drawer = true">
            <img class="Account-logo" src="./Assets/baseline_account_circle_black_18dp.png" />
          </v-app-bar-nav-icon>

          <p class="title-mobile">BuberEat</p>

          <div class="sign-in-mobile">
            <router-link class="router-link-sing-in" :to="{ name: 'Login' }">
              <a>Login</a>
            </router-link>
          </div>
        </div>

        <v-toolbar-title class="title">BuberEat</v-toolbar-title>

        <v-col class cols="12" sm="6" md="3">
          <v-text-field
            class="black"
            v-model="deliveryAddressInput"
            label="addresse de livraison"
            outlined
          ></v-text-field>
        </v-col>

        <div class="sign-in">
          <router-link class="router-link-sing-in" :to="{ name: 'Login' }">
            <a>Login</a>
          </router-link>
        </div>

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
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bug</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Bug report</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-content>
</template>

<script>
// import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      deliveryAddressInput: "",
      wantEatInput: ""
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  querySelections(v) {
    this.loading = true;
    // Simulated ajax query
    setTimeout(() => {
      this.items = this.states.filter(e => {
        return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
      });
      this.loading = false;
    }, 500);
  }
};
</script>
    
<style>
@import url("Assets/NavBar.scss");
</style>