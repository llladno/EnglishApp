<script setup lang="ts">

import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: var(--background-color);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  height: 50px;
}

</style>