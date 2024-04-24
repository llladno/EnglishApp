<script setup lang="ts">

import EAInput from '@/components/common/EAInput/EAInput.vue'
import EAButton from '@/components/common/EAButton/EAButton.vue'
import axios from 'axios'
import { useMovieStore } from '@/stores/counter'


async function submit(event: any){
  const movieStore = useMovieStore()
  event.preventDefault()
  const values = event.target
  if ((values[0].value && values[1].value)) {
    console.log('ok')
    const response = await axios.post('http://localhost:3005/login', {
      login: values[0].value,
      password: values[1].value
    })
    response.data ? null : movieStore.setError(true, 'Неверный логин или пароль')
  } else {
    movieStore.setError(true, 'Заполните все поля')
    console.log('Заполните все поля')
  }
}
</script>

<template>
  <div>
    <form @submit="submit">
      <EAInput :likes="1" title="Login"></EAInput>
      <EAInput :likes="1" title="Password"></EAInput>
      <EAButton title="Submit" type="submit"></EAButton>
      <RouterLink to="/registration">Registration</RouterLink>
    </form>
  </div>
</template>

<style scoped>
form{
  display: flex;
  flex-direction: column;
  gap: 15px
}

a{
  text-align: center;
}
</style>