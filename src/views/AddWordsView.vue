<script setup lang="ts">

import EAButton from '@/components/common/EAButton/EAButton.vue'
import EAInput from '@/components/common/EAInput/EAInput.vue'
import { reactive } from 'vue'
import { $api } from '@/api/consts'

let words = reactive([])
let word = reactive({
  word: '',
  translate: '',

})

let settings = {
  theme: '',
  level: '',
  category: ''
}

function addWord() {
  words.push({...word})
}

function sendNewWords(){
  let data = {
    settings,
    words: words
  }
  console.log(data)
  $api.post('/words', data)
}
</script>

<template>
  <h1>AddWordsView</h1>
  <div class="add">
    <div v-for="(w, index) in words" :key="index">
      <h4>Тема: {{w.theme}}</h4>
      <h2>Слово: {{w.word}}</h2>
      <h2>Перевод: {{w.translate}}</h2>
    </div>
    <select @change="settings.level = $event.target.value">
      <option selected disabled>Lvl</option>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    <select @change="settings.category = $event.target.value">
      <option disabled selected>Category</option>
      <option>Base English</option>
      <option>Food</option>
    </select>
    <EAInput placeholder="Theme" @change="settings.theme = $event.target.value"></EAInput>
    <EAInput placeholder="word" @change="word.word = $event.target.value"></EAInput>
    <EAInput placeholder="translate" @change="word.translate = $event.target.value"></EAInput>
    <EAButton @click="addWord">
      +
    </EAButton>
    <EAButton @click="sendNewWords">Отправить</EAButton>
  </div>

</template>

<style scoped>

.add{
  margin: 0px auto;
  width: 300px;
  display: grid;
  gap: 20px;
}
</style>