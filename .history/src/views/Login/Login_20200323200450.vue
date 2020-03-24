<template>
    <li v-for="item in JSON.parse($route.params.propsAdresses)" :key="item.id">>
        {{ item.disclaimer }}
    </li>
    <div>{{ JSON.parse($route.params.propsAdresses) }}</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
        
    }
  },
}

</script>