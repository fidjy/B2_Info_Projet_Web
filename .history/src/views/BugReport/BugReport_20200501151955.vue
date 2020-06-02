<template>
  <v-form class="form-bubereat" ref="form" v-model="valid" lazy-validation>
    <v-textarea
      id="input-bug-report"
      class="padding"
      v-model="message"
      :rules="messageRules"
      required
      name="input-7-1"
      label="please enter your messages"
      auto-grow
      value
      clearable
      outlined
      row-height="80%"
    ></v-textarea>

    <v-btn :disabled="!valid" color="success" class="mr-4 padding" @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "BugReport",
  data: () => ({
    valid: false,
    message: "",
    messageRules: [v => !!v || "Message is required"],
    surname: ""
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getUserInformations() {
      axios
        .post("/api/bugReport", {
          surn
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUserName() {
      console.log(this.$cookies.get("idUser"));
      axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          console.log(response);
          this.surname = response.data.surname;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
