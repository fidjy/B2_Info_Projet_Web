<template>
  <div>
    <li v-for="item in info" :key="item.id">
      {{ item.disclaimer }}
    </li>
    {{ JSON.parse($route.params.propsAdresses) }}
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