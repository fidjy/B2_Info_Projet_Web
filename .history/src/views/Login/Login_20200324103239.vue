<template>
  <div>
    <div v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id">
      {{ item }}
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
      test: " hello ",
    };
  },
  methods: {
    addToStreets: function (value)  {
      //this.test = value;
  return " yes "
      // this.streets.push(value);
    }
  },
};
</script>