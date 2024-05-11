<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import EAHeader from "@/components/layout/EAHeader/EAHeader.vue"
const testValue = 'testValue'
</script>

<template>
  <EAHeader></EAHeader>
  <main>
    <TheWelcome :test="testValue"/>
    <button @click="movieStore.setError(true, 'Error')">Addmovie</button>
  </main>
</template>
