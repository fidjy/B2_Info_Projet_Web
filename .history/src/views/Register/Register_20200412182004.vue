<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
          ></v-select>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
  
          ></v-checkbox>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";

export default {
  valid: false,
  name: "Register",
  data() {
    return {
      show4: false,
      title: "Preliminary report",
      email: "",
      emailLabel: "email",
      surname: "",
      surnameLabel: "surname",
      password: null,
      score: null,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: value =>
          this.password == value ||
          "The email and password you entered don't match",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    },
    login: function() {
      console.log("login");
    },
    showScore(score) {
      console.log("💯", score);
    }
  },
  computed: {
    checkPasswordConfirmation: function() {
      return "";
    }
  }
};
</script>

<style>
@import url("Assets/Register.scss");
</style>