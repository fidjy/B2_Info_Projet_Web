<template>
  <v-app id="inspire" class="picker_container">
    <v-date-picker class="picker" v-model="pickerDate"></v-date-picker>
    <v-time-picker class="picker" v-model="pickerHour"></v-time-picker>
    <router-link v-if="pickerHour != null" class="picker_router" :to="{ name: 'Purchase' }">
      <v-btn class="picker_button_not_valid" large @click="setPicker()" color="primary" outlined>Submit</v-btn>
    </router-link>
    <v-btn v-else class="picker_button" large color="primary" >Submit</v-btn>
  </v-app>
</template>

<script>
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
      this.$cookies.set("pickerDate", this.pickerDate);
      this.$cookies.set("pickerHour", this.pickerHour);
    }
  }
};
</script>

<style>
@import url("Assets/DateDelivery.scss");
</style>
