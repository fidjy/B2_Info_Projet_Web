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
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn v-if="valid" color="blue darken-1" text @click="save">Save</v-btn>
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
  name: "AdminHome",
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
        type: "",
        adresse: "the product",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.pnghttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png",
        tendance: 0,
        description: "",
        stars: 0
      },
      defaultItem: {
        name: "",
        type: "",
        adresse: "the product",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.pnghttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png",
        tendance: 0,
        description: "",
        stars: 0
      },
      restaurant: ""
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
        .put("/api/restaurants/" + item.id, {
          name: item.name,
          type: item.type,
          adresse: item.adresse,
          picture: item.picture,
          tendance: item.tendance,
          description: item.description
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
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
  async mounted() {
    this.loadingDataTable = true;
    await axios
      .get("/api/restaurants")
      .then(response => {
        this.desserts.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.loadingDataTable = false;
  }
};
</script>

<style>
@import url("Assets/AdminHome.scss");
</style>

