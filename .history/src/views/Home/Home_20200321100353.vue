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
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
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
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["name", "favoris", "stars", "image"],
      items: [
        {
          name: "Burger king",
          favoris: false,
          stars: 2.5,
          image: "https://images6.alphacoders.com/366/thumb-1920-366291.jpg"
        },
        {
          name: "kfc",
          favoris: false,
          stars: 3,
          image: "https://images5.alphacoders.com/444/thumb-1920-444393.jpg"
        },
        {
          name: "pizza napolini",
          favoris: false,
          stars: 5,
          image: "https://5.imimg.com/data5/YS/TA/MY-13049124/restaurant-wallpaper-design-500x500.jpg"
        },
        {
          name: "wtburger",
          favoris: false,
          stars: 1.5,
          image: "https://images2.alphacoders.com/862/862730.jpg"
        },
        {
          name: "lapastamanana",
          favoris: true,
          stars: 3,
          image: "https://www.pieuvre.ca/wp-content/uploads/2016/06/restaurant2-1.jpg"
        },
        {
          name: "colopotilini",
          favoris: false,
          stars: 4,
          image: "https://cdn.wallpaper.com/main/styles/responsive_1460w_scale/s3/wallpaper_design_awards_2020_-_judges_pack1-36.jpg?itok=AEbbABwV"
        },
        {
          name: "infractus",
          favoris: true,
          stars: 5,
          image: "https://4.imimg.com/data4/TS/MK/MY-310713/gf_002-500x500.jpg"
        },
        {
          name: "turcikebab",
          favoris: false,
          stars: 2.3,
          image: "https://wallpaperaccess.com/full/261577.jpg"
        },
        {
          name: "kebababa Boss",
          favoris: true,
          stars: 5.8,
          image: ""
        },
        {
          name: "viens dancer ce soir !",
          favoris: false,
          stars: 4.1,
          image: "https://s.hdnux.com/photos/01/01/50/56/17206204/3/920x920.jpg"
        },
        {
          name: "li tourner resto",
          favoris: false,
          stars: 3,
          image: "https://artwallbazaar.com/wp-content/uploads/parisian-girl-french-fashion-wallpaper-mural-pink-restaurant.jpg"
        },
        {
          name: "baila la gutera",
          favoris: false,
          stars: 4,
          image: "https://www.ahstatic.com/photos/5555_rsr001_00_p_1024x768.jpg"
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