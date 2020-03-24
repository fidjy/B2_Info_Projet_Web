<template>
  <div>
    <p>restaurant</p>
    <p>{{ $route.params.id }}</p>
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