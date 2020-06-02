<template>
    <v-app id="inspire" class="">
    <div>
      <v-date-picker class="picker" v-model="pickerDate"></v-date-picker>
      <v-time-picker class="picker" v-model="pickerHour"></v-time-picker>
    </div>
    <router-link class="text_register" :to="{ name: 'Purchase' }">
      <v-btn class="login_button" large @click="login()" color="primary" outlined>Submit</v-btn>
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
  }
};
</script>

<style>
@import url("Assets/DateDelivery.scss");
</style>
