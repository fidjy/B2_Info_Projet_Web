<template>
  <v-col class cols="12" sm="6" md="3">
    <v-text-field class="black" v-model="address" :label="label" outlined></v-text-field>
  </v-col>
</template>
    
<script>
// import axios from "axios";

export default {
  name: "NavBar",
  props:{
      label
  },
  data() {
    return {
      address: ""
    };
  }
};
</script>
