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

    <v-btn :disabled="!valid" color="success" class="mr-4 padding" @click="sendBugReport()">Validate</v-btn>
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
    email: ""
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
    sendBugReport() {
      axios
        .post("/api/bug_reports", {
          email: this.email,
          message: this.message
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUserInformations() {
      axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          console.log(response);
          this.email = response.data.email;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: function(){
    this.getUserInformations();
  }
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
