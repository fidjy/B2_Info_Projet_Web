<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <div class="login_container_input">
          <v-text-field
            v-model="email"
            :label="label"
            :hint="hint"
            :placeholder="placeholder"
            :outlined="outlined"
            :clearable="clearable"
            :counter="counterEn ? counter : false"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :label="label"
            :hint="hint"
            :placeholder="placeholder"
            :outlined="outlined"
            :clearable="clearable"
            :counter="counterEn ? counter : false"
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
      emailLabel: "email!",
      passwordLabel: "password!",
      placeholder: "",
      clearable: true,
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