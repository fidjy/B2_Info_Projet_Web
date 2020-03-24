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
          <v-autocomplete
            class="mx-4 box-shadow-customize"
            v-model="deliveryAddressInput"
            label="addresse de livraison"
            outlined
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            flat
            hide-no-data
            hide-details
            clearable
          ></v-autocomplete>
        </v-col>

        <div v-for="item in propositionAdresse" :key="item.id">
          <div
            v-for="things in item.features"
            :key="things.id"
          >{{ addToStreets(things.properties.label) }}</div>
        </div>

        <div class="sign-in">
          <router-link
            class="router-link-sing-in"
            :to="{ name: 'Login', params: { propsAdresses: JSON.stringify(streets) } }"
          >
            <a>Login</a>
            {{ streets }}
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
          <v-list-item-group active-class="deep-purple--text text--accent-4">
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

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      streets: [],
      propositionAdresse: "",
      drawer: false,
      deliveryAddressInput: "",
      wantEatInput: "",
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search: function(value) {
      this.streets = [];
      value && value !== this.select && this.querySelections(value);
      axios
        .get("https://api-adresse.data.gouv.fr/search/?q=france " + value)
        .then(response => (this.propositionAdresse = response));
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.streets.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    }
  },
  computed: {

  }
};
</script>
    
<style>
@import url("Assets/NavBar.scss");
</style>