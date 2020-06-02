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
        class="mx-auto card_menus_restaurant flex-wrap"
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
import commandStore from "../../stores/command";

export default {
  name: "RestaurantDishes",
  store: commandStore,
  data() {
    return {
      menus: [],
      choiceMenus: [],
      data: undefined,
      overlay: false,
      plats: [],
      radioGroup: 1,
      commandeNotFinishedId: "",
      userPlats: "",
      initializeCommand: ""
    };
  },
  computed: {
    idUser() {
      return commandStore.state.idUser;
    }
  },
  methods: {
    async addChoiceMenusPLat(plat) {
      this.overlay = !this.overlay;
      await axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          this.userPlats = [];
          for (const commande in response.data.Commandes) {
            if (response.data.Commandes[commande].state == 0) {
              this.commandeNotFinishedId =
                response.data.Commandes[commande]["@id"];
              for (const plat in response.data.Commandes[commande]["plats"]) {
                this.userPlats.push(
                  response.data.Commandes[commande]["plats"][plat]["@id"]
                );
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      this.userPlats.push(plat["@id"]);
      if (this.$cookies.get(plat["@id"]) == undefined) {
        this.$cookies.set(plat["@id"], 1);
      } else {
        this.$cookies.set(
          plat["@id"],
          parseInt(this.$cookies.get(plat["@id"])) + 1
        );
      }
      await axios
        .put(this.commandeNotFinishedId, {
          plats: this.userPlats
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      commandStore.commit("update");
    },
    async suppChoiceMenusPLat(plat) {
      if (this.$cookies.get(plat["@id"]) == 1) {
        await axios
          .get("/api/users/" + this.idUser)
          .then(response => {
            this.userPlats = [];
            for (const commande in response.data.Commandes) {
              if (response.data.Commandes[commande].state == 0) {
                this.commandeNotFinishedId =
                  response.data.Commandes[commande]["@id"];

                for (const plat in response.data.Commandes[commande]["plats"]) {
                  if (
                    response.data.Commandes[commande]["plats"][plat]["id"] !=
                    plat["id"]
                  ) {
                    this.userPlats.push(
                      response.data.Commandes[commande]["plats"][plat]["@id"]
                    );
                  }
                }
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });

        await axios
          .put(this.commandeNotFinishedId, {
            plats: this.userPlats
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$cookies.set(
          plat["@id"],
          parseInt(this.$cookies.get(plat["@id"])) - 1
        );
      }
      commandStore.commit("update");
    }
  },
  async mounted() {
    if (this.$cookies.get("log") == 'true') {
      await axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          this.initializeCommand = true;
          const userCommandes = [];
          for (const commande in response.data.Commandes) {
            userCommandes.push(response.data.Commandes["@id"]);
            if (response.data.Commandes[commande].state == 0) {
              this.commandeNotFinishedId =
                response.data.Commandes[commande]["@id"];
              this.initializeCommand = false;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      if (this.initializeCommand) {
        console.log("initialize command 0");
        await axios
          .post("/api/commandes", {
            address: "",
            state: "0",
            user: "/api/users/" + this.idUser,
            deliveryNumber: this.getRandomArbitrary(10000, 100000)
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }

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

