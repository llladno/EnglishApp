<script setup lang="ts">

import EALogin from '@/components/layout/EALogin/EALogin.vue'
import EAHeader from '@/components/layout/EAHeader/EAHeader.vue'


</script>

<template>
  <EAHeader></EAHeader>
  <div class="login">
    <div>
      <EALogin></EALogin>
    </div>
  </div>

</template>

<style scoped>
.login {
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>