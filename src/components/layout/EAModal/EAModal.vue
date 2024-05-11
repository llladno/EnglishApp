<script setup lang="ts">

</script>

<template>
<div class="modal">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: brightness(0.8) blur(5px);
}

.content {
  width: 400px;
  height: 300px;
  background: white;
  padding: 20px;
  border-radius: 20px;
}
</style>