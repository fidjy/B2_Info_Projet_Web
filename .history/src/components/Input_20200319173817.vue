<template>
  <v-col class cols="12" sm="6" md="3">
    <v-text-field class="black" v-model="address" label="Quel plat voulez-vous ?" outlined></v-text-field>
  </v-col>
</template>
    
<script>
// import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      address: ""
    };
  }
};
</script>
    
<style>
@import url("Assets/NavBar.scss");
</style>
