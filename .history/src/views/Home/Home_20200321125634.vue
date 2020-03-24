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
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <div class="container-picture-resto">
                <div class="center-picture-resto">
                  <v-row align="center" justify="center">
                    <v-img
                      :src="item.picture"
                      :alt="item.name"
                      lazy-src="https://i.pinimg.com/originals/09/30/65/09306586b11d8523d5955500a74a1a6b.gif"
                      aspect-ratio="1"
                      class="grey lighten-2 picture-restaurant text-right pa-2"
                      @click="favorit(item.favoris)"
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
                    </v-img>
                    <v-icon>{{ active ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  </v-row>
                </div>
              </div>

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
export default {
  name: "Home",
  data() {
    return {
      likedFavorit: true,
      selected: "",
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["name", "favoris", "tendance", "stars", "picture"],
      items: [
        {
          name: "Burger king",
          favoris: false,
          tendance: true,
          stars: 2.5,
          picture: "https://images6.alphacoders.com/366/thumb-1920-366291.jpg"
        },
        {
          name: "kfc",
          favoris: false,
          tendance: true,
          stars: 3,
          picture: "https://images5.alphacoders.com/444/thumb-1920-444393.jpg"
        },
        {
          name: "pizza napolini",
          favoris: false,
          tendance: false,
          stars: 5,
          picture:
            "https://5.imimg.com/data5/YS/TA/MY-13049124/restaurant-wallpaper-design-500x500.jpg"
        },
        {
          name: "wtburger",
          favoris: false,
          tendance: false,
          stars: 1.5,
          picture: "https://images2.alphacoders.com/862/862730.jpg"
        },
        {
          name: "lapastamanana",
          favoris: true,
          tendance: true,
          stars: 3,
          picture:
            "https://www.pieuvre.ca/wp-content/uploads/2016/06/restaurant2-1.jpg"
        },
        {
          name: "colopotilini",
          favoris: false,
          tendance: false,
          stars: 4,
          picture:
            "https://cdn.wallpaper.com/main/styles/responsive_1460w_scale/s3/wallpaper_design_awards_2020_-_judges_pack1-36.jpg?itok=AEbbABwV"
        },
        {
          name: "infractus",
          favoris: true,
          tendance: false,
          stars: 5,
          picture:
            "https://4.imimg.com/data4/TS/MK/MY-310713/gf_002-500x500.jpg"
        },
        {
          name: "turcikebab",
          favoris: false,
          tendance: false,
          stars: 2.3,
          picture: "https://wallpaperaccess.com/full/261577.jpg"
        },
        {
          name: "kebababa Boss",
          favoris: true,
          tendance: false,
          stars: 5,
          picture:
            "https://images-na.ssl-images-amazon.com/images/I/61NaHelfIzL._AC_.jpg"
        },
        {
          name: "viens dancer ce soir !",
          favoris: true,
          tendance: true,
          stars: 4.1,
          picture:
            "https://s.hdnux.com/photos/01/01/50/56/17206204/3/920x920.jpg"
        },
        {
          name: "li tourner resto",
          favoris: false,
          tendance: true,
          stars: 3,
          picture:
            "https://artwallbazaar.com/wp-content/uploads/parisian-girl-french-fashion-wallpaper-mural-pink-restaurant.jpg"
        },
        {
          name: "baila la gutera",
          favoris: false,
          tendance: false,
          stars: 4,
          picture:
            "https://www.ahstatic.com/photos/5555_rsr001_00_p_1024x768.jpg"
        }
      ]
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    },
    favorit(favoritValue) {
      if (favoritValue) {
        return "mdi-heart-outline";
      }
      return "mdi-heart";
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
    }
  }
};
</script>

<style>
@import url("Assets/Home.scss");
</style>