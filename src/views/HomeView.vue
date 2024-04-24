<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useMovieStore } from '@/stores/counter'

const movieStore = useMovieStore()
console.log(movieStore.$state.movies)
</script>

<template>
  <main>
    <TheWelcome />
    {{movieStore.movies}}
    <button @click="movieStore.setError(true, 'Error')">Addmovie</button>
  </main>
</template>
