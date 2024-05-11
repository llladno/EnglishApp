<script setup lang="ts">

import EAInput from '@/components/common/EAInput/EAInput.vue'
import EAButton from '@/components/common/EAButton/EAButton.vue'
import axios from 'axios'
import { useMovieStore } from '@/stores/counter'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

let data = ref({
  login: '',
  password: ''
})



async function submit(event: any){
  const movieStore = useMovieStore()
  event.preventDefault()
  const values = event.target
  console.log(data.value)
  if ((data.value.login && data.value.password)) {
    useUserStore().loginUser({login: data.value.login, password: data.value.password}).then((res)=>{ router.push('/account') }).catch((e)=>{
      if(e) movieStore.setError(true, 'Неверный логин или пароль')
      console.log('e')
    })
  } else {
    movieStore.setError(true, 'Заполните все поля')
    console.log('Заполните все поля')
  }
}
</script>

<template>
  <div>
    <form @submit="submit">
      <EAInput :likes="1" title="Login" v-model="data.login"></EAInput>
      <EAInput :likes="1" title="Password" v-model="data.password"></EAInput>
      <EAButton title="Submit" type="submit">Login</EAButton>
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