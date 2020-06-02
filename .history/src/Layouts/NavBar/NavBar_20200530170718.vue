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

          <div class="title-mobile">
            <div class="margin_title">BuberEat</div>
            <router-link
              class="router-link-sing-in"
              :to="{ name: 'Login' }"
            >
              <a class="margin_title">Login</a>
            </router-link>
          </div>

          <div class="sign-in-mobile">
            <v-app-bar-nav-icon class="right_card_mobile" @click.stop="drawerCart = !drawerCart">
              <v-icon>mdi-cart</v-icon>
            </v-app-bar-nav-icon>
          </div>
        </div>

        <v-toolbar-title class="title">BuberEat {{ idUser }}</v-toolbar-title>

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
            color="black"
            class="router-link-sing-in"
            :to="{ name: 'Login', params: { propsAdresses: JSON.stringify(streets) } }"
          >
            <a>Login</a>
          </router-link>
        </div>
        <v-app-bar-nav-icon class="right_card" @click.stop="drawerCart = !drawerCart">
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
        height="400"
      >
        <div class="font-italic margin-cart">
          <p>Your order</p>
          <v-card
            v-for="command in command.plats"
            :key="command.name"
            class="command_card"
            max-width="544"
          >
            <div v-if="$cookies.get(command['@id']) > 0">
              <v-card-text>
                <div>{{ $cookies.get(command['@id']) }} {{ command.name }}</div>
                <p class="display-1 text--primary">{{ command.description }}</p>
                <p>{{ command.price }} €</p>
              </v-card-text>
              <v-card-actions>
                <div class="my-2">
                  <v-btn
                    @click="suppChoiceMenusPLat(command)"
                    medium
                    outlined
                    color="primary"
                  >delete</v-btn>
                </div>
              </v-card-actions>
            </div>
          </v-card>
        </div>
        <div class="button_buy">
          <router-link :to="{ name: 'DateDelivery' }">
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
            <div @click="goHome()">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </div>

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

            <router-link v-if="this.$cookies.get('log')" :to="{ name: 'favorit' }">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Favorit</v-list-item-title>
              </v-list-item>
            </router-link>

            <v-list-item v-else>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Favorit</v-list-item-title>
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
import commandStore from "../../stores/command";

export default {
  store: commandStore,
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
      toggleExclusive:
        this.searchIconsRoles(this.$cookies.get("actualRole"))[2] || 0,
      surname: "",
      commandBox: [],
      itemsCart: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      commandeNotFinishedId: "",
      initializeCommand: true,
      userPlats: ""
    };
  },
  watch: {
    search: async function(value) {
      this.streets = [];
      value && value !== this.select && this.querySelections(value);

      let axiosConfig = {
        headers: {
            'access-control-allow-headers:': 'application/json;charset=UTF-8',
        }
      };

      await axios
        .get("https://api-adresse.data.gouv.fr/search/?q=france" + value
        )
        .then(response => {
          console.log("sfsd");
          this.propositionAdresse = response;
          })
        .catch(function(error) {
          console.log(error);
        });
      this.$cookies.set("addressDelivery", this.deliveryAddressInput);

      if (
        this.$cookies.get("log") &&
        this.$cookies.get("addressDelivery") != undefined &&
        this.$cookies.get("addressDelivery") != "undefined"
      ) {
        await axios
          .put(this.commandeNotFinishedId, {
            address: this.$cookies.get("addressDelivery")
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    log: function() {
      this.getUserInformations();
    }
  },
  methods: {
    goHome() {
      this.$router.replace({ path: this.searchIconsRoles(this.$cookies.get('actualRole'))[1] });
    },
    getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getPlats() {
      axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          for (const progressCommand in response.data.Commandes) {
            if (response.data.Commandes[progressCommand].state == 0) {
              this.commandBox = response.data.Commandes[progressCommand];
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCommands: async function() {
      if (this.$cookies.get("updateCommand") == "true") {
        this.$cookies.set("updateCommand", false);
        return this.updateCommand();
      }
    },
    updateCommand() {
      axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          for (const progressCommand in response.data.Commandes) {
            if (response.data.Commandes[progressCommand].state == 0) {
              this.commandBox = response.data.Commandes[progressCommand];
              return this.commandBox;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async suppChoiceMenusPLat(plat) {
      if (this.$cookies.get(plat["@id"]) == 0) {
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
    },
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
        .get("/api/users/" + this.idUser)
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
      commandStore.commit("setUserToNull");
      axios.defaults.headers.common = {
        Authorization: undefined
      };
      this.$router.replace({ path: "/Login" });
    }
  },
  computed: {
    command() {
      return commandStore.state.commandBox;
    },
    idUser() {
      return commandStore.state.idUser;
    },
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
    }
  },
  created: function() {
    if (this.$cookies.get("actualRole") == undefined) {
      this.$cookies.set("actualRole") == false;
    }
    this.$router.replace({
      path: this.searchIconsRoles(this.$cookies.get("actualRole"))[1]
    });
  },
  mounted: async function() {
    if (this.$cookies.get("log") == "true") {
      await axios
        .post("/api/login_check", {
          username: this.$cookies.get("mailUser"),
          password: this.$cookies.get("passwordUser")
        })
        .then(response => {
          axios.defaults.headers.common = {
            Authorization: `bearer ${response.data.token}`
          };
          commandStore.commit("getUserId", response.data.data.id);
          commandStore.commit("getUserRoles", response.data.data.roles);
        })
        .catch(function(error) {
          console.log(error);
        });

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

    await axios
      .get("/api/users/" + this.idUser)
      .then(response => {
        for (const progressCommand in response.data.Commandes) {
          if (response.data.Commandes[progressCommand].state == 0) {
            this.commandBox = response.data.Commandes[progressCommand];
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
};
</script>

<style>
@import url("Assets/NavBar.scss");
</style>
