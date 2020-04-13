<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <div class="login_container_input">
          <form class="inputContainerForm" action>
            <v-text-field
              class="text_field"
              type="prenom"
              v-model="email"
              :label="emailLabel"
              outlined
            ></v-text-field>

            <div class="containerInput BorderColor">
              <v-text-field
                class="text_field"
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                outlined
              ></v-text-field>
            </div>

            <password
              class="input centerText"
              placeholder="password"
              type="password"
              id="password"
              name="password"
              v-model="password"
              defaultClass="overwrite-password-strength"
              :toggle="true"
              @score="showScore"
              outlined
            />

            <v-text-field
              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.emailMatch]"
              :type="show4 ? 'text' : 'password'"
              name="input-10-2"
              label="Error"
              hint="At least 8 characters"
              value=""
              error
              @click:append="show4 = !show4"
              outlined
            ></v-text-field>

            <div class="submitContainer">
              <router-link v-if="checkPasswordConfirmation" :to="{ name: '' }">
                <input v-on:click="verifRegister()" class="submit" type="submit" value="Register" />
              </router-link>

              <router-link v-else :to="{ name: '' }">
                <input
                  v-on:click="verifRegister()"
                  class="darkSubmit"
                  type="submit"
                  value="Register"
                />
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";

export default {
  name: "Register",
  components: { Password },
  data() {
    return {
      show4: false,
      title: "Preliminary report",
      email: "",
      emailLabel: "email",
      password: null,
      score: null,
      passwordCheck: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
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