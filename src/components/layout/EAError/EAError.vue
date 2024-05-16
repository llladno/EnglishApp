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
    border-radius: 20px;
    background: white;
    top: 10px;
    z-index: 10;
    right: 10px;
    box-shadow: 0 0 10px black;

    animation: 0.2s forwards error-animation;

  }
  h2{
    color: red;
  }

  @keyframes error-animation {
    from{
      right: -100px;
      opacity: 0;
    }
    to {
      right: 10px;
      opacity: 1;
    }
  }
</style>