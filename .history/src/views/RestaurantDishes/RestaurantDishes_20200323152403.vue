<template>
  <div>
    <p>restaurant</p>
    <p>{{ item.name }}</p>
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