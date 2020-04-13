<template>
  <div>
    <p>restaurant</p>
    <p>{{ $route.params.restaurant }}</p>
    
  </div>
</template>

<script>
export default {
  name: "RestaurantDishes",
  data() {
    return {
    };
  }
};
</script>