<script setup lang="ts">
import EABar from '@/components/layout/EABar/EABar.vue'
import { onMounted, ref } from 'vue'
import Lessons from '@/components/pages/Lessons.vue'
import Info from '@/components/pages/Info.vue'
import { useUserStore } from '@/stores/userStore'
interface user {
  money: number,
  login: string,
  password: string,
  email: string,
  _id: string
}
let tab = ref(0)
let userInfo = ref<user>()

onMounted(()=>{
  const user = useUserStore()
  user.getUserInfo().then(res =>{
    userInfo.value = res.data
  })
})
</script>

<template>
  <div class="account">
    <EABar v-model="tab" @update:modelValue="tab = $event"></EABar>
    <div class="display">
      <h2>Личный кабинет {{ tab }}</h2>
      <div v-if="tab === 0" class="lessonsTab">
        <Lessons />
        <Info :userInfo="userInfo"></Info>
      </div>
      <div v-else-if="tab === 1">
        <h1>Rewards</h1>
      </div>
      <div v-else-if="tab === 2">
        <h1>Challenges</h1>
      </div>
      <div v-else-if="tab === 3">
        <h1>Settings</h1>
      </div>
    </div>
  </div>

</template>

<style scoped>
.account {
  display: flex;
  gap: 30px;
}

.display {
  width: 100%;
}

.lessonsTab{
  display: flex;
  width: 100%;
  justify-content: space-between;
}


</style>