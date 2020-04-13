<template>
  <div class="login_container_global">
    <v-text-field
      v-model="model"
      :label="label"
      :hint="hint"
      :placeholder="placeholder"
      :shaped="shaped"
      :outlined="outlined"
      :rounded="rounded"
      :solo="solo"
      :single-line="singleLine"
      :filled="filled"
      :clearable="clearable"
      :persistent-hint="persistentHint"
      :loading="loading"
      :flat="flat"
      :counter="counterEn ? counter : false"
      :dense="dense"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: "I'm a text field",
      label: "Hey!",
      hint: "Customize me!",
      placeholder: "",
      shaped: false,
      outlined: false,
      rounded: false,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: false,
      persistentHint: false,
      loading: false,
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