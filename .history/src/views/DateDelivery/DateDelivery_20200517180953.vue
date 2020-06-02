<template>
  <v-row justify="center">
    <v-date-picker v-model="picker"></v-date-picker>
    <v-time-picker v-model="picker"></v-time-picker>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "DateDelivery",
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {},
  created: function() {}
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
