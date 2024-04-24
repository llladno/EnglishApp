<script setup lang="ts">
defineProps({
  error: {
    type: String,
  }
})

</script>

<template>
<div class="error">
  <h2>{{error}}</h2>
</div>
</template>

<style scoped>
  .error{
    position: fixed;
    padding: 10px 15px;
    background: white;
    top: 0;
    z-index: 10;
    right: 0;
  }
  h2{
    color: red;
  }
</style>