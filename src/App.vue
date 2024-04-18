<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import EAHeader from "@/components/layout/EAHeader/EAHeader.vue";
</script>

<template>
<EAHeader />
  <RouterView />
</template>

<style>
</style>
