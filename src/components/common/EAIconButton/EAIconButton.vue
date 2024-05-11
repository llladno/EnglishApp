<script setup lang="ts">

</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  stroke: white;
  background: none;
  font-weight: 700;
  font-size: 20px;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
}
button:hover {
  stroke: var(--main-color);
}
</style>