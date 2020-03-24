<template>
  <div>
    <div v-for="(item, index) in JSON.parse($route.params.propsAdresses)">
      
      <div v-for="things in item.features" :key="things.id">
        {{ addToStreets(things.properties.label) }}
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