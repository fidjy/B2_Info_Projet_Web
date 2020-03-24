<template>
  <div class="Home center-block">
    <p>home</p>
    <DishesPresentation></DishesPresentation>
  </div>
</template>

<script>
import DishesPresentation from "./DishesPresentation";

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