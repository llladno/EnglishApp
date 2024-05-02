<script setup lang="ts">
import EABar from '@/components/layout/EABar/EABar.vue'
import { ref } from 'vue'

let tab = ref(0)

const ob = [
  {
    word: 'cat',
    translate: 'кошка'
  },
  {
    word: 'dog',
    translate: 'собака'
  },
  {
    word: 'mouse',
    translate: 'мышь'
  }
]

for (let key in ob) {
  console.log(ob[key])
}
console.log(tab.value)
</script>

<template>
  <div class="account">
    <EABar v-model="tab" @update:modelValue="tab = $event"></EABar>
    <div>
      <h2>Личный кабинет {{ tab }}</h2>
      <div v-if="tab === 0">
        <h1>Lessons</h1>
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

</style>