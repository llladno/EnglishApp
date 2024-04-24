<script setup lang="ts">
import { RouterView } from 'vue-router'
import EAHeader from "@/components/layout/EAHeader/EAHeader.vue";
import { useMovieStore } from '@/stores/counter'
import { ref } from 'vue'
import EAError from '@/components/layout/EAError/EAError.vue'

const error = ref(useMovieStore())
console.log(error)
</script>

<template>
<EAHeader />
  <RouterView />
  <EAError v-if="error.error.status" :error="error.error.message"></EAError>
</template>

<style>
</style>
