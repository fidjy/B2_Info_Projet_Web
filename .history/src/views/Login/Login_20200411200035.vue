<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <div class="login_container_input">
          <v-text-field
            v-model="model"
            :label="label"
            :hint="hint"
            :placeholder="placeholder"
            :shaped="shaped"
            :outlined="outlined"
            :single-line="singleLine"
            :filled="filled"
            :clearable="clearable"
            :counter="counterEn ? counter : false"
            :dense="dense"
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
      model: "",
      label: "Hey!",
      hint: "Customize me!",
      placeholder: "",
      clearable: true,
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