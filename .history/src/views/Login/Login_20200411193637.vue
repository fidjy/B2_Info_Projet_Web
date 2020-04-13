<template>
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
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
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