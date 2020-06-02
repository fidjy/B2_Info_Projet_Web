<template>
  <div class="restaurant-container">
    <div class="restaurant-description">
      <v-card class="mx-auto card-margin" width="100%">
        <v-img
          class="white--text align-end justify-end picture-restaurant"
          height="40vh"
          :src="JSON.parse($route.params.restaurant).picture"
        ></v-img>
        <v-card class="restaurant-presentation" raised>
          <v-card-title class="restaurant-title">{{ JSON.parse($route.params.restaurant).name }}</v-card-title>
          <v-card-title
            class="restaurant-description"
          >{{ JSON.parse($route.params.restaurant).description }}</v-card-title>
        </v-card>
      </v-card>
    </div>

    <div class="info-welcoming-container">
      <div class="wallpaper-filter">
        <v-alert class="info-title">Menus</v-alert>
      </div>
    </div>

    <div class="menus_restaurant">
      <v-card
        v-for="menu in menus"
        :key="menu.name"
        class="mx-auto card_menus_restaurant"
        width="23vw"
        min-width="30px"
        raised
      >
        <v-img class="white--text align-end" height="200px" :src="menu.picture"></v-img>

        <v-card-subtitle class="pb-4">{{ menu.name }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ menu.description }}</div>

          <div>{{ menu.price }} €</div>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="addChoiceMenus(menu)" color="primary" outlined>add</v-btn>

          <v-btn @click="suppChoiceMenus(menu)" color="primary" outlined>cancel</v-btn>
        </v-card-actions>
        <v-overlay :value="overlay">
          <v-card class="overlay_choice" raised>
            <v-radio-group v-model="radioGroup">
              <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
            </v-radio-group>
            <div>
              <v-btn
                class="overlay_button"
                @click="overlay = false"
                color="primary"
                outlined
              >add to cart</v-btn>
              <v-btn class="overlay_button" @click="overlay = false" color="primary" outlined>cancel</v-btn>
            </div>
          </v-card>
        </v-overlay>
      </v-card>
    </div>

    <div class="info-welcoming-container">
      <div class="wallpaper-filter">
        <v-alert class="info-title">Dishes</v-alert>
      </div>
    </div>
    <div v-for="item in menus" :key="item.name">{{item}}</div>

    <div class="menus_restaurant">
      <v-card
        v-for="menu in menus"
        :key="menu.name"
        class="mx-auto card_menus_restaurant"
        width="23vw"
        min-width="30px"
        raised
      >
        <v-img class="white--text align-end" height="200px" :src="menu.picture"></v-img>

        <v-card-subtitle class="pb-4">{{ menu.name }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ menu.description }}</div>

          <div>{{ menu.price }} €</div>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="addChoiceMenus(menu)" color="primary" outlined>add</v-btn>

          <v-btn @click="suppChoiceMenus(menu)" color="primary" outlined>cancel</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RestaurantDishes",
  data() {
    return {
      menus: [],
      choiceMenus: [],
      data: undefined,
      overlay: false,
      radioGroup: 1
    };
  },
  methods: {
    addChoiceMenus(menu) {
      this.overlay = !this.overlay;
      console.log(menu);
    },
    suppChoiceMenus(menu) {
      console.log(menu);
    }
  },
  mounted() {
    axios({
      method: "get",
      url: "/api/restaurants/" + JSON.parse(this.$route.params.restaurant).id
    })
      .then(response => {
        for (let item in response.data.formule) {
          axios({
            method: "get",
            url: response.data.formule['@id']
          })
            .then(response => {
              response.data;
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
@import url("Assets/RestaurantDishes.scss");
</style>

