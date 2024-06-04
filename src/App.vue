<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMovieStore } from '@/stores/counter'
import { ref } from 'vue'
import EAError from '@/components/layout/EAError/EAError.vue'

const error = ref(useMovieStore())
</script>

<template>
  <RouterView />
  <EAError v-if="error.error.status" :error="error.error.message">

  </EAError>
</template>

<style>
</style>
