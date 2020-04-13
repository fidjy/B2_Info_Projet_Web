<template>
  <div class="Register">
    <form class="inputContainerForm" action>
      <div class="containerInput BorderColor">
        <img
          class="personnIcon"
          src="https://www.materialui.co/materialIcons/social/person_black_216x216.png"
        />
        <input v-model="prenom" class="input" placeholder="prenom" id="prenom" name="prenom" />
      </div>

      <div class="containerInput BorderColor">
        <img
          class="personnIcon"
          src="https://www.materialui.co/materialIcons/social/person_black_216x216.png"
        />
        <input v-model="nom" class="input" placeholder="nom" type="nom" id="nom" name="nom" />
      </div>

      <div class="containerInput BorderColor">
        <img class="lockIcon" src="https://image.flaticon.com/icons/png/512/46/46951.png" />
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
        <img
          class="lockIcon cadenaIcon"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/OOjs_UI_icon_lock.svg/768px-OOjs_UI_icon_lock.svg.png"
        />
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

      <!-- <p class="white">{{ dataResponse.data['id'] }}</p> -->

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