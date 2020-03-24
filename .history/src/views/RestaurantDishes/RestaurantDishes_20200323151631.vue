<template>
  <div>
    <p>restaurant</p>
    <p>{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  name: "RestaurantDishes",
  data() {
    return {
      item: Object,
    };
  }
};
</script>