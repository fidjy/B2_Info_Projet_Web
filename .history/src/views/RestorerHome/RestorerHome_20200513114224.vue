<template>
  <div class="container-menu">
    <v-card class="container-menu-v-card margin">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="elevation-1"
      ></v-data-table>
    </v-card>
    <p class="size-big">titre {{ restaurant }}</p>
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

export default {
  name: "RestorerHome",
  data() {
    return {
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
        { text: "Picture", value: "picture" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        }
      ],
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

      restaurant: undefined
    };
  },
  mounted() {
    axios
      .get("/api/users/" + this.$cookies.get("idUser"))
      .then(response => {
        this.restaurant = response.data.Restaurants;
      })
      .catch(function(error) {
        console.log(error);
      });

    // axios
    //   .get("/api/restaurant/" + this.$cookies.get("idUser"))
    //   .then(response => {
    //     this.restaurant = response.data.Restaurants;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    console.log(this.restaurant);
  }
};
</script>

<style>
@import url("Assets/RestorerHome.scss");
</style>
