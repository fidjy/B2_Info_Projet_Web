<template>
  <v-col class cols="12" sm="6" md="3">
    <v-text-field class="black" v-model="inputValue" :label="labelUber" outlined></v-text-field>
  </v-col>
</template>
    
<script>
// import axios from "axios";

export default {
  name: "NavBar",
  props: {
    labelUber: String,
    inputValue: String,
  },
  data() {
    return {

    };
  },
};
</script>
