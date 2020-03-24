<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="blue"
      dark
      shrink-on-scroll
      prominent
      src="https://wallpaperaccess.com/full/512858.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(89, 171, 227), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>BuberEat</v-toolbar-title>

      <v-col class cols="12" sm="6" md="3">
        <v-text-field v-model="address" label="Outlined" outlined></v-text-field>
      </v-col>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="100vh">
      <v-container style="height: 100h;"></v-container>
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
</template>
<slot />
<script>
// import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      address: "118 rue de Gerland"
    };
  }
};
</script>
    