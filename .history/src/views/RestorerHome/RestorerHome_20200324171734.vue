<template>
  <v-card>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "RestaurerHome",
  data() {
    return {};
  }
};
</script>