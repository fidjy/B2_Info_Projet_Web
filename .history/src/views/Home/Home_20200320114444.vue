<template>
  <div class="center-block">
    <p>home</p>
    <DishesPresentation></DishesPresentation>
  </div>
</template>

<script>
import DishesPresentation from "../RestaurantDishes/RestaurantDIshes.vue";

export default {
  name: "Home",
  components: {
    DishesPresentation
  },
  data() {
    return {

    };
  }
};
</script>

<style>
@import url("Assets/Home.scss");
</style>