<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      :loading="loadingDataHome"
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1 elevation-24">
          <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search"></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

              <v-progress-linear indeterminate a="6"></v-progress-linear>

      <template v-slot:default="props">
        <div class="info-welcoming-container">
          <div class="wallpaper-filter">
            <v-alert
              class="info-welcoming"
            >Welcome to BuberEat ! Here you can order whatever you like to eat . . . 😊</v-alert>
          </div>
        </div>
        <v-row class="container-dishes">
          <v-col
            class="dish"
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-row align="center" justify="center">
                <v-item-group class="container-picture-resto">
                  <v-item class="center-picture-resto" v-slot:default="{ active, toggle }">
                    <div class="router-link-sing-in">
                      <div class="right-container-for-link-restaurant">
                        <router-link
                          class="right-part-link-restaurant"
                          :to="{ name: 'RestaurantDishes', params: { restaurant: JSON.stringify(item) } }"
                        ></router-link>
                      </div>
                      <div class="left-container-for-link-restaurant">
                        <router-link
                          class="left-part-link-restaurant"
                          :to="{ name: 'RestaurantDishes', params: { restaurant: JSON.stringify(item) } }"
                        ></router-link>
                      </div>

                      <v-img
                        :src="item.picture"
                        :alt="item.name"
                        lazy-src="https://i.pinimg.com/originals/09/30/65/09306586b11d8523d5955500a74a1a6b.gif"
                        aspect-ratio="1"
                        class="grey lighten-2 picture-restaurant text-right pa-2"
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0 center">
                            <v-progress-circular
                              class="progress-circular"
                              indeterminate
                              color="white lighten-20"
                            ></v-progress-circular>
                          </v-row>
                        </template>

                        <div v-if="checkFavorite(item.usersFavorite)">
                          <v-btn
                            v-if="$cookies.get('log')"
                            @click="toggle, suppFavorit(item.id)"
                            class="button-heart"
                            icon
                            dark
                          >
                            <v-icon>{{ active ? 'mdi-heart-outline' : 'mdi-heart' }}</v-icon>
                          </v-btn>
                        </div>
                        <div v-else>
                          <v-btn
                            v-if="$cookies.get('log')"
                            @click="toggle, suppFavorit(item.id)"
                            class="button-heart"
                            icon
                            dark
                          >
                            <v-icon>{{ active ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                          </v-btn>
                        </div>
                      </v-img>
                    </div>
                  </v-item>
                </v-item-group>
              </v-row>

              <div class="description-restaurant">
                <v-card-title class="restaurant-name subheading font-weight-bold">{{ item.name }}</v-card-title>
                <v-card-title
                  class="restaurant-stars subheading font-weight-bold"
                >{{ item.stars }} ⭐</v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
          <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      selected: [],
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["name", "tendance", "stars"],
      items: [],
      user: "",
      loadingDataHome: false
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    checkFavorite(restaurantUserFavorit) {
      if (this.$cookies.get("log")) {
        for (const value in restaurantUserFavorit) {
          if (
            restaurantUserFavorit[value]["id"] == this.$cookies.get("idUser")
          ) {
            return true;
          }
        }
        return false;
      }
    },
    async suppFavorit(restaurantId) {
      await axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          this.user = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });

      await axios
        .put("/api/restaurants/" + restaurantId, {
          usersFavorite: [this.user]
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addFavorit(restaurantId) {
      let usersFavoriteList;
      axios
        .get("/api/restaurants" + restaurantId)
        .then(response => {
          usersFavoriteList = response.data.usersFavorite;
        })
        .catch(function(error) {
          console.log(error);
        });

      axios
        .put("/api/restaurants" + restaurantId, {
          usersFavorite: [this.user]
        })
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.loadingDataHome = true;
    axios({
      method: "get",
      url: "/api/restaurants.json"
    })
      .then(response => {
        this.items = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    this.loadingDataHome = false;
  }
};
</script>

<style>
@import url("Assets/Home.scss");
</style>
