<template>
  <v-app id="inspire" class="picker_container">
    <v-date-picker class="picker" v-model="pickerDate"></v-date-picker>
    <v-time-picker class="picker" v-model="pickerHour"></v-time-picker>
    <router-link v-if="pickerHour != null" class="picker_router" :to="{ name: 'Purchase' }">
      <v-btn class="picker_button" @click="setPicker()" color="primary" large>Submit</v-btn>
    </router-link>
    <router-link v-else class="picker_router" :to="{ name: 'DateDelivery' }">
      <v-btn class="picker_button_not_valid" color="primary" large outlined>Submit</v-btn>
    </router-link>
  </v-app>
</template>

<script>
import axios from "axios";
import commandStore from '../../stores/command';

export default {
  store: commandStore,
  name: "DateDelivery",
  data() {
    return {
      pickerDate: new Date().toISOString().substr(0, 10),
      pickerHour: null,
      commandBox: ""
    };
  },
  computed: {
    idUser() {
      return commandStore.state.idUser;
    }
  },
  methods: {
    async setPicker() {
      await axios
        .put(this.commandBox["@id"], {
          deliveryDate: this.pickerDate + this.pickerHour
        })
        .then(response => {
          console.log("pickerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" + response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: async function() {
    if(this.idUser != 0) {
      await axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          this.user = response.data;
          for (const progressCommand in response.data.Commandes) {
            if (response.data.Commandes[progressCommand].state == 0) {
              this.commandBox = response.data.Commandes[progressCommand];
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  }
};
</script>

<style>
@import url("Assets/DateDelivery.scss");
</style>
