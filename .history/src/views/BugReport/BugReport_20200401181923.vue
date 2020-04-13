<template>
  <v-form class="form-bubereat" ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

    <v-textarea
      v-model="message"
      :rules="messageRules"
      name="input-7-1"
      label="please enter your messages"
      auto-grow
      value
      clearable
      outlined
      row-height="80%"
    ></v-textarea>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "BugReport",
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    message: "",
    messageRules: [
      v => !!v || "Message is required"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
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
    }
  }
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
