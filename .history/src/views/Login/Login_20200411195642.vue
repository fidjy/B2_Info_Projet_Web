<template>
  <div class="login_container_global">
    <div class="login_container_border_lines">
      <div class="login_container_border_rectangle">
        <div class="login_container_input">
          <v-text-field
            v-model="model"
            :label="label"


            :shaped="shaped"
            :outlined="outlined"
            :rounded="rounded"
            :solo="solo"
            :single-line="singleLine"
            :filled="filled"
            :clearable="clearable"
            :persistent-hint="persistentHint"
            :flat="flat"
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
      label: "Hey!",
      hint: "Customize me!",
      placeholder: "",
      outlined: false,
      rounded: false,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: false,
      persistentHint: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false,
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