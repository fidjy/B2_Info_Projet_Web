<template>
  <div>
    <div v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id">
        {{ item.features.type }}
      <!-- <li v-for="item in item.features" :key="item.id">
            {{ item.properties.label }}
      </li> -->
    </div>
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