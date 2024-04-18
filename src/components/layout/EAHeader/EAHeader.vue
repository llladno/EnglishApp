<script setup lang="ts">

import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/registration">Login</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: #f4bff4;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  height: 50px;
}

a{
  text-decoration: none;
  color: var(--link-color);
  transition: 0.2s;
}
a:hover{
  color: var(--link-hover)
}
</style>