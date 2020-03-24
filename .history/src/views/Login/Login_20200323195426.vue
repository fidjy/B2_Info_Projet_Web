<template>
    <div>{{ JSON.parse($route.params.propsAdresses.data) }}</div>
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