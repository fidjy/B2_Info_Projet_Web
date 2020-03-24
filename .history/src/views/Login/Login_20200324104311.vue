<template>
  <div>
    <div v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id">
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
    };
  },
  methods: {
    addToStreets: function (value)  {
      if(this.streets.includes(value) == false){
        this.streets.push(value);
      }
    }
  },
};
</script>