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
            <v-toolbar-title>{{ usersNumber }} Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer>
              <router-link class="title_admin" :to="{ name: 'AdminHome' }">Restaurants</router-link>
              <router-link class="title_admin" :to="{ name: 'adminBugReport' }">Bug report</router-link>
            </v-spacer>
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
                            :rules="[rules.required, rules.email]"
                            v-model="editedItem.email"
                            label="email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-combobox
                            :rules="[rules.required]"
                            v-model="editedItem.roles"
                            :items="roles"
                            label="Roles"
                            multiple
                            outlined
                            dense
                          ></v-combobox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.password"
                            label="password"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.surname"
                            label="surname"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.name"
                            label="name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="editedItem.avatar"
                            label="avatar"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn v-if="valid" color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="icons_actions">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            <router-link
              class="title_admin"
              :to="{ name: 'AdminCommandsUser', params: { command: JSON.stringify(item['@id']) } }"
            >
              <v-icon medium>mdi-arrow-right-bold</v-icon>
            </router-link>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <p class="size-big">titre</p>
    <v-container fluid>
      <v-sparkline
        :value="value"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="lineWidth"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
        :show-labels="showLabels"
        :label-size="labelSize"
      ></v-sparkline>
    </v-container>
  </div>
</template>

<script>
const gradients = [["#222"]];
import axios from "axios";
import { integer } from "vuelidate/lib/validators";

export default {
  name: "AdminUsers",
  data() {
    return {
      roles: ["ROLE_RESTORER", "ROLE_ADMIN", "ROLE_DELIVERER"],
      loadingDataTable: false,
      valid: false,
      rules: {
        required: value => !!value || "Required",
        min: v => v.length >= 8 || "Min 8 characters",
        number: value => !!value || "Required number",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      dialog: false,
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "Roles", value: "roles" },
        { text: "Password", value: "password" },
        { text: "Surname", value: "surname" },
        { text: "Avatar", value: "avatar" },
        { text: "Balance", value: "balance" },
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
        email: "",
        roles: "",
        password: "",
        surname: "",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.pnghttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png",
        balance: 0
      },
      defaultItem: {
        name: "",
        email: "",
        roles: "",
        password: "",
        surname: "",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.pnghttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png",
        balance: 0
      },
      users: "",
      usersNumber: 0
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
        .put("/api/users/" + item.id, {
          name: item.name,
          email: item.email,
          roles: item.roles,
          password: item.password,
          surname: item.surname,
          avatar: item.avatar
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
      this.restaurantsNumber = this.desserts.length;
      axios
        .put("/api/users/" + item.id, {
          users: null
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

    async save() {
      await axios
        .post("/api/users", {
          name: this.editedItem.name,
          email: this.editedItem.email,
          roles: this.editedItem.roles,
          password: this.editedItem.password,
          surname: this.editedItem.surname,
          avatar: this.editedItem.avatar,
          balance: this.editedItem.balance
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.restaurantsNumber = this.desserts.length;
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
  async mounted() {
    this.loadingDataTable = true;
    await axios
      .get("/api/users")
      .then(response => {
        for (const data in response.data) {
          console.log(response.data[data]);
          console.log(data);
        }
        console.log(response.data["hydra:member"]);
        for (const plat in response.data["hydra:member"]) {
          axios
            .get(response.data["hydra:member"][plat]["@id"])
            .then(response => {
              this.desserts.push(response.data);
              this.usersNumber = this.desserts.length;
              // console.log(this.desserts);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    this.loadingDataTable = false;
  }
};
</script>

<style>
@import url("Assets/AdminUsers.scss");
</style>

