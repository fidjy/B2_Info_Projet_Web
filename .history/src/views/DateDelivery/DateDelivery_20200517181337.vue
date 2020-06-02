<template>
  <v-row justify="center">
    <v-date-picker v-model="pickerDate"></v-date-picker>
    <v-time-picker v-model="pickerHour"></v-time-picker>
    <v-btn class="login_button" large @click="login()" color="primary" outlined>Submit</v-btn>
  </v-row>
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
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
