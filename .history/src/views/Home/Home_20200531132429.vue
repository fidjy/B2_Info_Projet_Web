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
      no-data-text="loading . . ."
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

      <template v-slot:default="props">
        <div class="info-welcoming-container">
          <div class="wallpaper-filter">
            <v-alert class="info-welcoming">Welcome to BuberEat !</v-alert>
          </div>
        </div>
        <v-row class="container-dishes">
          <v-col
            class="flex-wrap"
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
                        <div class="favoritTendanceContainer">
                          <v-btn
                            v-if="$cookies.get('log') && checkFavorite(item.usersFavorits)"
                            @click="toggle() + suppFavorit(item.id)"
                            class="button-heart"
                            icon
                            dark
                          >
                            <v-icon>{{ active ? 'mdi-heart-outline' : 'mdi-heart' }}</v-icon>
                          </v-btn>

                          <v-btn
                            v-if="$cookies.get('log') && !checkFavorite(item.usersFavorits)"
                            @click="toggle() + addFavorit(item.id)"
                            class="button-heart"
                            icon
                            dark
                          >
                            <v-icon>{{ active ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                          </v-btn>
                          <div v-if="item.tendance == true" class="tendance">✨en tendance!✨</div>
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
import commandStore from "../../stores/command";

export default {
  store: commandStore,
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
      loadingDataHome: true,
      usersFavoriteList: "",
      restaurantToAdd: ""
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    },
    idUser() {
      return commandStore.state.idUser;
    }
  },
  methods: {
    changeLiked(changeLiked) {
      if (changeLiked != true && changeLiked != true) {
        return (changeLiked = true);
      }
      return !changeLiked;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async changeStateFavorit(active, restaurantId) {
      if (active) {
        this.suppFavorit(restaurantId);
      } else {
        this.addFavorit(restaurantId);
      }
    },
    checkFavorite(restaurantUserFavorit) {
      if (this.$cookies.get("log") && this.idUser != 0) {
        for (const value in restaurantUserFavorit) {
          restaurantUserFavorit[value] = restaurantUserFavorit[value].replace(
            "/api/users/",
            ""
          );
          if (restaurantUserFavorit[value] == this.idUser) {
            return true;
          }
        }
        return false;
      }
    },
    async suppFavorit(restaurantId) {
      if (this.idUser != 0) {
        await axios
          .get("/api/users/" + this.idUser)
          .then(response => {
            this.user = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        const favorit = [];

        for (const value in this.user.favoritRestaurants) {
          if (this.user.favoritRestaurants[value].id != restaurantId) {
            favorit.push(this.user.favoritRestaurants[value]["@id"]);
          }
        }

        await axios
          .put("/api/users/" + this.idUser, {
            favoritRestaurants: favorit
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        this.getRestaurants();
      }
    },
    async addFavorit(restaurantId) {
      if (this.idUser != 0) {
        this.restaurantToAdd = [];
        await axios
          .get("/api/restaurants/" + restaurantId)
          .then(response => {
            this.restaurantToAdd = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });

        const favorit = [];
        favorit.push(this.restaurantToAdd["@id"]);

        for (const value in this.user.favoritRestaurants) {
          favorit.push(this.user.favoritRestaurants[value]["@id"]);
        }

        await axios
          .put("/api/users/" + this.idUser, {
            favoritRestaurants: favorit
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        this.getRestaurants();
      }
    },
    async getRestaurants() {
      await axios({
        method: "get",
        url: "/api/restaurants.json"
      })
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  async mounted() {
    this.loadingDataHome = true;
    if (this.idUser != 0) {
      await axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          this.user = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    this.getRestaurants();
    this.loadingDataHome = false;
  }
};
</script>

<style>
@import url("Assets/Home.scss");
</style>
