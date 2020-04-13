<template>
  <v-card class="">
    <v-spacer></v-spacer>
    <v-text-field class="search-"
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      show-select
      :single-select="singleSelect"
      v-model="selected"
      item-key="name"
      class="elevation-1"
    ></v-data-table>
    <div class="buttons-collection sticky">
      <v-btn class="mx-2 sticky outline-none" fab dark  color="primary">
        <v-icon class="outline-none" dark>mdi-minus</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "RestaurerHome",
}
</script>

<style>
@import url("Assets/RestorerHome.scss");
</style>