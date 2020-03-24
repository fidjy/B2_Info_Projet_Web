<template>
  <div>
    <li v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id">
      {{ item.features[0] }}
    </li>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  }
};
</script>