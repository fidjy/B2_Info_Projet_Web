<template>
  <div></div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      streets: []
    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    }
  }
};
</script>