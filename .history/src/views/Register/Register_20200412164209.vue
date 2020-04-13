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
              :outlined="outlined"
            ></v-text-field>

            <div class="containerInput BorderColor">
              <input
                v-model="email"
                class="input"
                placeholder="email"
                type="email"
                id="email"
                name="email"
              />
                          <v-text-field
                          type="email"
              class="text_field"
              type="prenom"
              v-model="email"
              :label="emailLabel"
              :outlined="outlined"
            ></v-text-field>
            </div>

            <div class="containerInput">
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
              />
            </div>

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
    return {};
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    },
    login: function() {
      console.log("login");
    }
  }
};
</script>

<style>
@import url("Assets/Register.scss");
</style>