<script setup lang="ts">
import { ref } from 'vue'

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
    border: 3px solid #c73fa7;
    padding: 10px 10px;
    border-radius: 10px;
    outline: none;
  }
  input:focus {
    border: 3px solid #592659;
  }
</style>