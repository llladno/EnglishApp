<script setup lang="ts">
defineProps<{
  type: string
}>()
</script>

<template>
  <button :type="type">
    <slot></slot>
  </button>
</template>

<style scoped>
  button {
    background: var(--main-color);
    font-weight: 700;
    font-size: 20px;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;
  }
  button:hover {
    background: var(--acent-color);
  }
</style>