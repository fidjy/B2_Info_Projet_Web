<template>
  <div>
    <div v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id">
      <div v-for="item in item.features" :key="item">
        {{ addToStreets(item.properties.label) }}
      </div>
    </div>
    {{ streets }}
    
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      streets: [],
      test: [],
    };
  },
  methods: {
    addToStreets: function (value)  {
      this.test = value;
      return "value = " + value
      // this.streets.push(value);
    }
  },
};
</script>