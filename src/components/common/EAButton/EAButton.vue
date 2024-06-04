<script setup lang="ts">
defineProps<{
  type?: string
}>()
</script>

<template>
  <button :type="type">
    <slot></slot>
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