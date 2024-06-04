<script setup lang="ts">

import type { userI } from '@/types/userTypes'
import IconCoin from '@/components/icons/IconCoin.vue'
import EAStack from '@/components/common/EAStack/EAStack.vue'
import IconHeart from '@/components/icons/IconHeart.vue'

interface user {
  money: number,
  login: string,
  password: string,
  email: string,
  _id: string,
  health: number,
  level: number
}

defineProps({
  userInfo: Object as () => user
})

</script>

<template>
  <div>
    <h1>Info</h1>
    <EAStack direction="row" spacing="10px" align="center">
      <IconCoin :width="30"></IconCoin>
      <h1>{{userInfo?.money}}</h1>
    </EAStack>
    <EAStack direction="row" spacing="10px" align="center">
      <IconHeart :width="30"></IconHeart>
      <h1>{{userInfo?.health}}</h1>
    </EAStack>
  </div>

</template>

<style scoped>

</style>