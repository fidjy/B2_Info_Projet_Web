<template>
  <div class="container-menu">
    <v-card class="container-menu-v-card margin">
      <v-data-table
        :loading="loadingDataTable"
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ restaurant.name }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.name"
                            label="name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.number]"
                            type="number"
                            v-model="editedItem.price"
                            label="price"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.description"
                            label="description"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.picture"
                            label="picture"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
                  <v-btn v-if="valid" color="blue darken-1" text @click="save()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
const gradients = [["#222"]];
import axios from "axios";
import { integer } from "vuelidate/lib/validators";
import commandStore from "../../stores/command";

export default {
  store: commandStore,
  name: "RestorerHome",
  data() {
    return {
      loadingDataTable: false,
      valid: false,
      rules: {
        required: value => !!value || "Required",
        min: v => v.length >= 8 || "Min 8 characters",
        number: value => !!value || "Required number"
      },
      dialog: false,
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Dish",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Price", value: "price" },
        { text: "Description", value: "description" },
        { text: "Picture", value: "picture" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      desserts: [],
      showLabels: false,
      lineWidth: 2,
      labelSize: 7,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 50, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        price: parseInt(6),
        description: "the product",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.pnghttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png"
      },
      defaultItem: {
        name: "",
        price: integer,
        description: "",
        picture: ""
      },

      restaurant: ""
    };
  },
  computed: {
    idUser() {
      return commandStore.state.idUser;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    rolesUser() {
      return commandStore.state.rolesUser;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;

      axios
        .put("/api/plats/" + item.id, {
          name: item.name,
          price: item.price,
          description: item.description,
          picture: item.picture
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
      axios
        .put("/api/plats/" + item.id, {
          restaurants: null
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        axios
          .post("/api/plats", {
            name: this.editedItem.name,
            price: parseFloat(this.editedItem.price),
            description: this.editedItem.description,
            picture: this.editedItem.picture,
            restaurants: this.restaurant["@id"]
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      this.close();
    }
  },
  async mounted() {
    this.loadingDataTable = true;
    let restorerState = false;
    if (this.$cookies.get("log") != "true") {
      //this.$router.replace({ path: "/" });
    }
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
          commandStore.commit("getUserRoles", response.data.data.roles);
        })
        .catch(function(error) {
          console.log(error);
        });

      for (const role in this.rolesUser) {
        if (this.rolesUser[role] == "ROLE_RESTORER") {
          restorerState = true;
        }
      }
      if (restorerState == false) {
        //this.$router.replace({ path: "/" });
      }
      await axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          this.restaurant = response.data.Restaurants[0];

          for (const plat in this.restaurant.plats) {
            console.log(this.restaurant.plats[plat]);
            axios
              .get(this.restaurant.plats[plat])
              .then(response => {
                this.desserts.push(response.data);
                console.log(this.desserts);
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    this.loadingDataTable = false;
  }
};
</script>

<style>
@import url("Assets/RestorerHome.scss");
</style>
