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
export default {
  name: "BugReport",
  data: () => ({
    valid: false,
    message: "",
    messageRules: [
      v => !!v || "Message is required"
    ],
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
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          this.surname = response.data.surname;
          this.email = response.data.email;
          this.image = response.data.avatar;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
