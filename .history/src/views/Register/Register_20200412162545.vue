<template>
  <div class="login_container_global">

    
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {

    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    },
    login: function() {
      console.log("login");
    }
  }
};
</script>

<style>
@import url("Assets/Register.scss");
</style>