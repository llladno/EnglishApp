<script setup lang="ts">

defineProps<{
  title?: string
  likes?: number,
}>()

</script>

<template>
  <input :placeholder="title">
</template>

<style scoped>
  input {
    border: 2px solid var(--main-color);
    background: var(--test-color);
    color: var(--text-color);
    padding: 10px 10px;
    border-radius: 10px;
    outline: none;
    font-size: 18px;
    font-weight: 500;
  }
  input::placeholder {
    color: var(--text-secondary-color);
  }
  input:focus {
    border: 2px solid var(--acent-color);
  }
</style>