<template>
  <div class="Register">
    <form class="inputContainerForm" action>
      <div class="containerInput BorderColor">
        <input v-model="prenom" class="input" placeholder="prenom" id="prenom" name="prenom" />
      </div>

      <div class="containerInput BorderColor">
        <input v-model="nom" class="input" placeholder="nom" type="nom" id="nom" name="nom" />
      </div>

      <div class="containerInput BorderColor">
        <input
          v-model="email"
          class="input"
          placeholder="email"
          type="email"
          id="email"
          name="email"
        />
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
          <input v-on:click="verifRegister()" class="darkSubmit" type="submit" value="Register" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";

export default {
  name: "Register",
  components: { Password },
  data() {
    return {

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
    }
  }
};
</script>

<style>
@import url("Assets/Register.scss");
</style>