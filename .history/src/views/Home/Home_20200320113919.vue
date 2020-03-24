<template>
    <p class="center-block">
      <p>home</p>
      <RestPresentation />
    </p>
</template>

<script>
import RestPresentation from "../../components/RestPresentation";

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