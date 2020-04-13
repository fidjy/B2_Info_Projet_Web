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
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      emailLabel: "email",
      passwordLabel: "password",
      placeholder: "",
      outlined: true,
      counter: 0,
      streets: []
    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    }
  }
};
</script>

<style>
@import url("Assets/Login.scss");
</style>