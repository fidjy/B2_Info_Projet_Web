<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <v-form
          ref="form"
          :v-model="valid"
          :lazy-validation="lazy"
          class="login_container_input"
          action
        >
          <div class="text_field">
            <v-text-field
              type="surname"
              :rules="[rules.required]"
              v-model="surname"
              :label="surnameLabel"
              outlined
              
            ></v-text-field>
          </div>

          <v-text-field
            class="text_field"
            v-model="email"
            :rules="[rules.required, rules.email]"
            value
            label="E-mail"
            outlined
            messages
            
          ></v-text-field>

          <div class="text_field">
            <v-text-field
              v-model="password"
              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show4 ? 'text' : 'password'"
              name="input-10-2"
              label="password again"
              hint="At least 8 characters"
              value
              @click:append="show4 = !show4"
              outlined
              
            ></v-text-field>
            <password v-model="password" strength-meter-only @score="showScore" />
          </div>

          <v-text-field
            class="text_field"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="password again"
            hint="At least 8 characters"
            value
            @click:append="show4 = !show4"
            outlined
            
          ></v-text-field>

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
  lazy: true,
  name: "Register",
  components: { Password },
  data() {
    return {
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    lazy: false,
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