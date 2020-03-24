<template>
  <div>
    <div v-for="item in JSON.parse($route.params.propsAdresses)" :key="ta">
      <div v-for="item in item.features" :key="re">
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