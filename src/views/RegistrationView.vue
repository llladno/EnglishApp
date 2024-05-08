<script setup lang="ts">
import EARegistrationFrom from '@/components/layout/EARegistrationForm/EARegistrationFrom.vue'
import EAHeader from '@/components/layout/EAHeader/EAHeader.vue'
</script>

<template>
  <EAHeader></EAHeader>
  <div class="registration">
    <div>
      <EARegistrationFrom></EARegistrationFrom>
    </div>
  </div>
</template>

<style scoped>
.registration {
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
