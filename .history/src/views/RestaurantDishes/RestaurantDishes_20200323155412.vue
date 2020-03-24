<template>
  <div>
    <p>restaurant</p>
    <p>{{ restaurant.name }}</p>
  </div>
</template>

<script>
export default {
  name: "RestaurantDishes",
  props: ['restaurant'],
  data() {
    return {
    };
  }
};
</script>