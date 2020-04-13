<template>
  <div class="container-menu">
    <v-card class="container-menu-v-card">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
    </v-card>
        <v-container fluid>
      <v-sparkline
        :value="value"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="lineWidth"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
        :show-labels="showLabels"
        :label-size="labelSize"
      ></v-sparkline>
  
      <v-divider></v-divider>
  
      <v-row>
        <v-col cols="12">
          <v-row class="fill-height" align="center">
            <v-subheader class="pl-0">Type</v-subheader>
            <v-btn-toggle v-model="type" mandatory>
              <v-btn small text value="bar">bar</v-btn>
              <v-btn small text value="trend">trend</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-row class="fill-height" align="center">
            <v-subheader class="pl-0">Gradient</v-subheader>
            <v-item-group v-model="gradient" mandatory>
              <v-row>
                <v-item
                  v-for="(gradient, i) in gradients"
                  :key="i"
                  v-slot:default="{ active, toggle }"
                  :value="gradient"
                >
                  <v-card
                    :style="{
                      background: gradient.length > 1
                        ? `linear-gradient(0deg, ${gradient})`
                        : gradient[0],
                      border: '2px solid',
                      borderColor: active ? '#222' : 'white'
                    }"
                    width="30"
                    height="30"
                    class="mr-2"
                    @click.native="toggle"
                  ></v-card>
                </v-item>
              </v-row>
            </v-item-group>
          </v-row>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-row class="fill-height" align="center">
            <v-subheader class="pl-0">Gradient direction</v-subheader>
            <v-btn-toggle v-model="gradientDirection" mandatory>
              <v-btn small text value="top">top</v-btn>
              <v-btn small text value="right">right</v-btn>
              <v-btn small text value="left">left</v-btn>
              <v-btn small text value="bottom">bottom</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
  
        <v-col cols="12">
          <v-slider
            v-model="lineWidth"
            label="Line width"
            min="0.1"
            max="10"
            step="0.1"
            thumb-label
            :disabled="autoLineWidth"
          ></v-slider>
        </v-col>
  
        <v-col cols="12">
          <v-slider
            v-model="radius"
            label="Radius"
            min="0"
            max="16"
            thumb-label
          ></v-slider>
        </v-col>
  
        <v-col cols="12">
          <v-slider
            v-model="padding"
            label="Padding"
            min="0"
            max="16"
            thumb-label
          ></v-slider>
        </v-col>
  
        <v-col cols="6">
          <v-row class="fill-height" align="center">
            <v-subheader class="pl-0">Linecap</v-subheader>
            <v-btn-toggle v-model="lineCap" mandatory :disabled="type !== 'trend'">
              <v-btn small text value="butt">butt</v-btn>
              <v-btn small text value="round">round</v-btn>
              <v-btn small text value="square">square</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
  
        <v-col cols="6">
          <v-row justify="space-around">
            <v-switch v-model="showLabels" label="Show labels"></v-switch>
            <v-switch v-model="fill" label="Fill" :disabled="type !== 'trend'"></v-switch>
            <v-switch v-model="autoLineWidth" label="Auto-line-width" :disabled="type !== 'bar'"></v-switch>
          </v-row>
        </v-col>
  
        <v-col v-if="showLabels" cols="12">
          <v-slider
            v-model="labelSize"
            label="Label size"
            min="1"
            max="20"
            thumb-label
          ></v-slider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RestorerHome",
  data () {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
};
</script>

<style>
@import url("Assets/RestorerHome.scss");
</style>