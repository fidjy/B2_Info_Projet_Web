<template>
  <v-content>
    <v-sheet class="overflow-hidden height-nav-bar">
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
        class="app-bar nav-bar"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(89, 171, 227, .9), rgba(25,32,72,.7)"></v-img>
        </template>

        <div class="header">
          <v-app-bar-nav-icon @click="drawer = true">
            <v-icon>mdi-apps</v-icon>
          </v-app-bar-nav-icon>

          <p class="title-mobile">BuberEat</p>

          <div class="sign-in-mobile">
            <router-link
              class="router-link-sing-in"
              :to="{ name: 'Login', params: { propsAdresses: JSON.stringify(streets) } }"
            >
              <a>Login</a>
            </router-link>
          </div>
        </div>

        <v-toolbar-title class="title">BuberEat</v-toolbar-title>

        <v-col class cols="12" sm="6" md="3">
          <v-autocomplete
            background-color="black"
            class="mx-4 box-shadow-customize"
            v-model="deliveryAddressInput"
            label="addresse de livraison"
            outlined
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            :cache-items="cachItem"
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
          <a v-if="this.$cookies.get('log')">{{ surname }}</a>
          <router-link
            v-else
            class="router-link-sing-in"
            :to="{ name: 'Login', params: { propsAdresses: JSON.stringify(streets) } }"
          >
            <a color="black">Login</a>
          </router-link>
        </div>
        <v-app-bar-nav-icon @click.stop="drawerCart = !drawerCart">
          <v-icon>mdi-cart</v-icon>
        </v-app-bar-nav-icon>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        class="scrollbar"
        v-model="drawerCart"
        absolute
        temporary
        :right="position"
        width="344"
      >
        <div class="font-italic margin-cart">
          <p>Your order</p>
          <v-card class="mx-auto" max-width="544">
            <v-card-text>
              <div>Word of the Day</div>
              <p class="display-1 text--primary">be•nev•o•lent</p>
              <p>pizza</p>
            </v-card-text>
            <v-card-actions>
              <div class="my-2">
                <v-btn medium outlined color="primary">delete</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
        <div class="button_buy">
          <router-link :to="{ name: 'Purchase' }">
            <v-btn color="primary">Buy</v-btn>
          </router-link>
        </div>
      </v-navigation-drawer>

      <v-sheet id="scrolling-techniques-5" class="overflow-y-auto scrollbar" max-height="100vh">
        <v-container class="slot-container" style="height: 100vh;">
          <div class="center-container">
            <slot />
          </div>
        </v-container>
      </v-sheet>

      <v-navigation-drawer v-model="drawer" absolute temporary height="400px">
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4 icons_nav_container">
            <router-link :to="{ path: searchIconsRoles($cookies.get('actualRole'))[1] }">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link v-if="this.$cookies.get('log')" :to="{ name: 'Account' }">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </router-link>

            <v-list-item v-else>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <router-link v-if="this.$cookies.get('log')" :to="{ name: 'BugReport' }">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-bug</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Bug report</v-list-item-title>
              </v-list-item>
            </router-link>

            <v-list-item v-else>
              <v-list-item-icon>
                <v-icon>mdi-bug</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Bug report</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>

          <v-card flat v-if="this.$cookies.get('log')">
            <v-card-text>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <div class="text-center">User Type</div>
                </v-col>
                <v-btn-toggle v-model="toggleExclusive" mandatory>
                  <router-link
                    v-for="item in roles"
                    :key="item.id"
                    :to="{ path: searchIconsRoles(item)[1] }"
                  >
                    <v-btn @click="changeActualRole(item)">
                      <v-icon>{{searchIconsRoles(item)[0]}}</v-icon>
                    </v-btn>
                  </router-link>
                </v-btn-toggle>
              </v-row>
            </v-card-text>
          </v-card>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      userRoute: "",
      cachItem: true,
      streets: [],
      propositionAdresse: "",
      drawer: false,
      deliveryAddressInput: "",
      wantEatInput: "",
      loading: false,
      items: [],
      search: null,
      select: null,
      drawerCart: null,
      position: true,
      roles: [],
      toggleExclusive: this.searchIconsRoles(this.$cookies.get("actualRole"))[2] || 0,
      surname: "",
      itemsCart: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },
  watch: {
    search: function(value) {
      this.streets = [];
      value && value !== this.select && this.querySelections(value);
      axios
        .get("https://api-adresse.data.gouv.fr/search/?q=france " + value)
        .then(response => (this.propositionAdresse = response));
      this.$cookies.set("addressDelivery", this.deliveryAddressInput);
    },
    log: function() {
      this.getUserInformations();
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = this.streets.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    searchIconsRoles: function(role) {
      if (role == "ROLE_USER") {
        return ["mdi-account", "/", 0];
      }
      if (role == "ROLE_ADMIN") {
        return ["mdi-wrench", "/AdminHome", 1];
      }
      if (role == "ROLE_DELIVER") {
        return ["mdi-bike", "/DeliverHome", 2];
      }
      if (role == "ROLE_RESTORER") {
        return ["mdi-chef-hat", "/RestorerHome", 3];
      }
      return "";
    },
    changeActualRole: function(actualRole) {
      this.$cookies.set("actualRole", actualRole);
      console.log(this.$cookies.get("actualRole"));
    },
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    },
    getUserInformations() {
      axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          this.surname = response.data.surname;
          this.roles = response.data.roles;
          this.$cookies.set("log", true);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    logout() {
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
      axios.defaults.headers.common = {
        Authorization: undefined
      };
      this.$router.replace({ path: "/Login" });
    }
  },
  computed: {
    log: function() {
      this.getUserInformations();
      if (this.$route.path == "/Login") {
        return "";
      }
      if (this.$route.path == "/Register") {
        return "";
      }
      if (this.$route.path == "/") {
        return "";
      }
      return "";
    },

  },
  created: function() {
    this.$router.replace({
      path: this.searchIconsRoles(this.$cookies.get("actualRole"))[1]
    });
  }
};
</script>

<style>
@import url("Assets/NavBar.scss");
</style>
