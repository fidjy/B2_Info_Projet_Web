<template>
  <div>
    <p>restaurant</p>
    <p>{{ $route.params.restaurant }}</p>
    <v-card class="mx-auto" max-width="400" raised>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      ></v-img>

      <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" outlined>Share</v-btn>

        <v-btn color="primary" outlined>Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RestaurantDishes",
  data() {
    return {
      menus: [
        {
          name: "Burger king",
          picture: "https://images6.alphacoders.com/366/thumb-1920-366291.jpg",
          price: 12
        }
      ]
    };
  }
};
</script>