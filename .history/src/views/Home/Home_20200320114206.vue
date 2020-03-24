<template>
    <div class="center-block">
      <p>home</p>
      <RestPresentation />
    </div>
</template>

<script>
import DishesPresentation from "../../components/DishesPresentation";

export default {
  name: "Home",
  components: {
    RestPresentation
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