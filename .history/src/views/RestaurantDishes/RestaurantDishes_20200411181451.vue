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
          <v-row justify="center">
            <v-dialog v-model="dialog" scrollable max-width="300px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
              </template>
              <v-card>
                <v-card-title>Select Country</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <v-radio-group v-model="dialogm1" column>
                    <v-radio label="Bahamas, The" value="bahamas"></v-radio>
                    <v-radio label="Bahrain" value="bahrain"></v-radio>
                    <v-radio label="Bangladesh" value="bangladesh"></v-radio>
                    <v-radio label="Barbados" value="barbados"></v-radio>
                    <v-radio label="Belarus" value="belarus"></v-radio>
                    <v-radio label="Belgium" value="belgium"></v-radio>
                    <v-radio label="Belize" value="belize"></v-radio>
                    <v-radio label="Benin" value="benin"></v-radio>
                    <v-radio label="Bhutan" value="bhutan"></v-radio>
                    <v-radio label="Bolivia" value="bolivia"></v-radio>
                    <v-radio label="Bosnia and Herzegovina" value="bosnia"></v-radio>
                    <v-radio label="Botswana" value="botswana"></v-radio>
                    <v-radio label="Brazil" value="brazil"></v-radio>
                    <v-radio label="Brunei" value="brunei"></v-radio>
                    <v-radio label="Bulgaria" value="bulgaria"></v-radio>
                    <v-radio label="Burkina Faso" value="burkina"></v-radio>
                    <v-radio label="Burma" value="burma"></v-radio>
                    <v-radio label="Burundi" value="burundi"></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-btn @click="suppChoiceMenus(menu)" color="primary" outlined>cancel</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div class="info-welcoming-container">
      <div class="wallpaper-filter">
        <v-alert class="info-title">Dishes</v-alert>
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
      </v-card>
    </div>
  </div>
</template>

<script>
import Vuetify from '../../plugins/vuetify';

export default {
  name: "RestaurantDishes",
  vuetify: new Vuetify(),
  data() {
    return {
      menus: [
        {
          name: "le burger de cheeeeeeeeeeez nous",
          picture:
            "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F03ab5e89-bad7-4a44-b952-b30c68934215.2Ejpeg/410x230/quality/80/crop-from/center/burger-maison.jpeg",
          price: 12,
          description: "bla bla bla"
        },
        {
          name: "le burger de cheeeeeeeeeeez nous",
          picture:
            "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F03ab5e89-bad7-4a44-b952-b30c68934215.2Ejpeg/410x230/quality/80/crop-from/center/burger-maison.jpeg",
          price: 12,
          description: "bla bla bla"
        },
        {
          name: "le burger de cheeeeeeeeeeez nous",
          picture:
            "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F03ab5e89-bad7-4a44-b952-b30c68934215.2Ejpeg/410x230/quality/80/crop-from/center/burger-maison.jpeg",
          price: 12,
          description: "bla bla bla"
        },
        {
          name: "le burger du nord pas de galais",
          picture:
            "https://www.atelierdeschefs.com/media/recette-e29710-rougail-saucisse-du-sud-ouest.jpg",
          price: 5,
          description: "bla bla bla"
        },
        {
          name: "la bonne fritas",
          picture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fries_2.jpg/1200px-Fries_2.jpg",
          price: 2,
          description: "bla bla bla"
        },
        {
          name: "la fritas woula pas cher",
          picture:
            "https://i.f1g.fr/media/madame/orig/sites/default/files/img/2017/11/la-frite-est-elle-belge-ou-francaise-.jpg",
          price: 1,
          description: "bla bla oula"
        }
      ],
      choiceMenus: [],
      data: undefined,
      dialogm1: "",
      dialog: false
    };
  },
  methods: {
    addChoiceMenus(menu) {
      console.log(menu);
    },
    suppChoiceMenus(menu) {
      console.log(menu);
    }
  }
};
</script>

<style>
@import url("Assets/RestaurantDishes.scss");
</style>

