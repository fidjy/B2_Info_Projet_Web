<template>
  <v-app id="inspire">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
      <v-col cols="12" md="6">
        <v-sheet elevation="12" class="pa-12">
          <v-textarea
            v-model="model"
            :auto-grow="autoGrow"
            :clearable="clearable"
            :counter="counter ? counter : false"
            :filled="filled"
            :flat="flat"
            :hint="hint"
            :label="label"
            :loading="loading"
            :no-resize="noResize"
            :outlined="outlined"
            :persistent-hint="persistentHint"
            :placeholder="placeholder"
            :rounded="rounded"
            :row-height="rowHeight"
            :rows="rows"
            :shaped="shaped"
            :single-line="singleLine"
            :solo="solo"
          ></v-textarea>
          <div class="mt-12 text-center">Value: {{ model }}</div>
        </v-sheet>
      </v-col>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "BugReport",
  data: () => ({
    autoGrow: false,
    autofocus: true,
    clearable: false,
    counter: 0,
    filled: false,
    flat: false,
    hint: "",
    label: "",
    loading: false,
    model: "I'm a textarea.",
    noResize: false,
    outlined: false,
    persistentHint: false,
    placeholder: "",
    rounded: false,
    rowHeight: 24,
    rows: 1,
    shaped: false,
    singleLine: false,
    solo: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
