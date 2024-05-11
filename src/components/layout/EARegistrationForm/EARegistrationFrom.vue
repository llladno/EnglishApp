<script setup lang="ts">

import EAInput from '@/components/common/EAInput/EAInput.vue'
import EAButton from '@/components/common/EAButton/EAButton.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

let data = ref({
  email: '',
  login: '',
  password: '',
  repeatPassword: ''
})


function submit(event: any) {
  event.preventDefault()
  const values = event.target
  const send = data.value

  if ((send.email || send.password || send.login || send.repeatPassword)) {
    if ((send.password !== send.repeatPassword) || send.email.replace(/^\S+@\S+\.\S+$/) !== 'undefined') {
      console.log('error')
    } else{
      useUserStore().createUser({
        email: send.email,
        login: send.login,
        password: send.password
      })
      // TODO добавить обработку ошибок
    }
  } else {
    console.log('Заполните все поля')
  }
}
</script>

<template>
  <h1>
    Registration
  </h1>
  <form @submit="submit">
    <EAInput :likes="1" title="Email" v-model="data.email"></EAInput>
    <EAInput :likes="1" title="Login" v-model="data.login"></EAInput>
    <EAInput :likes="1" title="Password" v-model="data.password"></EAInput>
    <EAInput :likes="1" title="Repeat password" v-model="data.repeatPassword"></EAInput>
    <EAButton type="submit">
      Submit
    </EAButton>
  </form>

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>