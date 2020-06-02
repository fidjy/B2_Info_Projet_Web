<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <div class="login_container_input">
          <v-text-field class="text_field" v-model="email" :label="emailLabel" :outlined="outlined"></v-text-field>
          <v-text-field
            class="text_field"
            v-model="password"
            :label="passwordLabel"
            :outlined="outlined"
            type="password"
          ></v-text-field>
          <v-btn class="login_button" large @click="login()" color="primary" outlined>Login</v-btn>
          <p class="text_no_account">
            No account yet ?
            <router-link class="text_register" :to="{ name: 'Register' }">Register</router-link>
            <v-text-field v-if="loading" color="success" loading disabled></v-text-field>
          </p>
          <v-alert v-if="errorState" type="error">{{ errorMessage }}</v-alert>
          <v-alert
            v-if="errorState == false"
            type="success"
          >successful authentication, you will be redirected</v-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../stores/command";

export default {
  name: "Login",
  data() {
    return {
      store: store,
      email: "ouiwxcwc@gmail.com",
      password: 'zaeazeé&"é"é&',
      emailLabel: "email",
      passwordLabel: "password",
      placeholder: "",
      outlined: true,
      counter: 0,
      errorState: undefined,
      errorMessage: "",
      loading: false,
      streets: []
    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    },
    async login() {
      let errorStatusAxios = "";
      let errorStateAxios = false;
      this.loading = true;
      await axios
        .post("/api/login_check", {
          username: this.email,
          password: this.password
        })
        .then(response => {
          axios.defaults.headers.common = {
            Authorization: `bearer ${response.data.token}`
          };
          store.commit("getUserId", response.data.data.id);
          store.commit("getUserRoles", response.data.data.role);
          this.$cookies.set("mailUser", this.email);
          this.$cookies.set("passwordUser", this.password);
          this.$cookies.set("log", true);
        })
        .catch(function(error) {
          errorStatusAxios = error;
          errorStateAxios = true;
          console.log("erreur");
        });

      // token = axios.defaults.headers.common.Authorization.replace(
      //   "bearer ",
      //   ""
      // );

      if (errorStateAxios) {
        this.errorMessage = errorStatusAxios.response.data.message;
      }
      this.errorState = errorStateAxios;

      if (!errorStateAxios) {
        this.$router.replace({ path: "/" });
      }

      this.loading = false;
    }
  }
};
</script>

<style>
@import url("Assets/Login.scss");
</style>
