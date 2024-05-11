<script setup lang="ts">

defineProps<{
  title?: string
  likes?: number,
}>()

const data = defineModel()

</script>

<template>
  <input :placeholder="title" v-model="data">
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