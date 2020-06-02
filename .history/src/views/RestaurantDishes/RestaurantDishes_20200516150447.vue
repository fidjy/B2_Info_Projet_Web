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
          <v-btn @click="addChoiceMenusFormules(menu)" color="primary" outlined>add</v-btn>

          <v-btn @click="suppChoiceMenusFormules(menu)" color="primary" outlined>cancel</v-btn>
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

    <div class="menus_restaurant">
      <v-card
        v-for="plat in plats"
        :key="plat.name"
        class="mx-auto card_menus_restaurant"
        width="23vw"
        min-width="30px"
        raised
      >
        <v-img class="white--text align-end" height="200px" :src="plat.picture"></v-img>

        <v-card-subtitle class="pb-4">{{ plat.name }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ plat.description }}</div>

          <div>{{ plat.price }} €</div>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="addChoiceMenusPLat(plat)" color="primary" outlined>add</v-btn>

          <v-btn @click="suppChoiceMenusPLat(plat)" color="primary" outlined>cancel</v-btn>
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
      plats: [],
      radioGroup: 1,
      commandeNotFinishedId: ""
    };
  },
  methods: {
    async addChoiceMenusPLat(plat) {
      this.overlay = !this.overlay;
      this.getCommandStateZero();
    },
    async suppChoiceMenusPLat(plat) {
      console.log(plat);
    },
    async getCommandStateZero() {
      await axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          const userCommandes = [];
          for (const commande in response.data.Commandes) {
            if (response.data.Commandes[commande].state == 0) {
              this.commandeNotFinishedId =
                response.data.Commandes[commande]["@id"];
              for(const plat in response.data.Commandes[commande]["@id"]) {
                console.log("plat : " + response.data.Commandes[commande]["@id"].plats['@id']);
                //userCommandes.push(response.data.Commandes[commande]["@id"]);
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  async mounted() {
    axios({
      method: "get",
      url: "/api/restaurants/" + JSON.parse(this.$route.params.restaurant).id
    })
      .then(response => {
        for (const plat in response.data.plats) {
          axios({
            method: "get",
            url: response.data.plats[plat]
          })
            .then(response => {
              this.plats.push(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }

        for (const item in response.data.formule) {
          axios({
            method: "get",
            url: response.data.formule[item]["@id"]
          })
            .then(response => {
              this.menus.push(response.data);
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

