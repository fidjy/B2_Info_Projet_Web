<template>
    <div class="center-block">
      <p>home</p>
      <RestPresentation />
    </div>
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