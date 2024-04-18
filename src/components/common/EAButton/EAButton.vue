<script setup lang="ts">
defineProps<{
  title: string,
  type: string
}>()
</script>

<template>
  <button :type="type">
    {{title}}
  </button>
</template>

<style scoped>
  button {
    background: #c73fa7;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
  }
</style>