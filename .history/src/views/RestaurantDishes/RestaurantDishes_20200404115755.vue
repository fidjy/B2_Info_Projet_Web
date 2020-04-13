<template>
  <div>
    <p>restaurant</p>
    <p>{{ setRestaurant($route.params.restaurant) }}</p>
    <!-- <div v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id"></div> -->

    <v-card v-for="menu in menus" :key="menu.name" class="mx-auto" max-width="400" raised>
      <v-img class="white--text align-end" height="200px" :src="menu.picture"></v-img>

      <v-card-subtitle class="pb-4">{{ menu.name }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ menu.description }}</div>

        <div>{{ menu.price }} €</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" outlined>add</v-btn>

        <v-btn color="primary" outlined>delete</v-btn>
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
      ]
    };
  },
  methods: {
    setRestaurant: function (restaurant) {
      this.restaurant = restaurant
    }
  }
};
</script>