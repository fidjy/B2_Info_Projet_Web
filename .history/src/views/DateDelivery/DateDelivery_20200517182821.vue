<template>
  <v-app id="inspire" class="picker_container">
    <v-date-picker class="picker" v-model="pickerDate"></v-date-picker>
    <v-time-picker class="picker" v-model="pickerHour"></v-time-picker>

    <router-link class="picker_router" :to="{ name: 'Purchase' }">
      <v-btn class="picker_button" large @click="setPicker()" color="primary" outlined>Submit</v-btn>
    </router-link>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "DateDelivery",
  data() {
    return {
      pickerDate: new Date().toISOString().substr(0, 10),
      pickerHour: null
    };
  },
  methods: {
    setPicker() {
      
    }
  }
};
</script>

<style>
@import url("Assets/DateDelivery.scss");
</style>
