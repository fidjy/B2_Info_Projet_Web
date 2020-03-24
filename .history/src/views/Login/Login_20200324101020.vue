<template>
  <div>
    <div v-for="item.features in JSON.parse($route.params.propsAdresses)" :key="item.id">
      <div v-for="item in item.features" :key="item.id">
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
    };
  },
  methods: {
    addToStreets: function (value)  {
      if(this.streets == ""){
        this.streets.push(value);
      }

    }
  },
};
</script>