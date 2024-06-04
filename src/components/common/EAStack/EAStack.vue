<script setup lang="ts">
defineProps({
  direction: String,
  spacing: String,
  align: String,
  justify: String,
})
</script>

<template>
  <div class="stack">
    <slot></slot>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  direction: v-bind(direction);
  align-items: v-bind(align);
  justify-content: v-bind(justify);
  gap: v-bind(spacing);
}
</style>