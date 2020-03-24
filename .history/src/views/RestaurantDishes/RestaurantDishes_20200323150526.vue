<template>
  <div>
    <p>restaurant</p>
    <p>{{ restaurant }}</p>
  </div>
</template>

<script>
export default {
  name: "RestaurantDishes",
  data() {
    return {
      restaurant: {}
    };
  }
};
</script>