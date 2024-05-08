<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import EAHeader from "@/components/layout/EAHeader/EAHeader.vue"

</script>

<template>
  <EAHeader></EAHeader>
  <main>
    <TheWelcome />
    <button @click="movieStore.setError(true, 'Error')">Addmovie</button>
  </main>
</template>
