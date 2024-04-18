<script setup lang="ts">

import EAInput from '@/components/common/EAInput/EAInput.vue'
import EAButton from '@/components/common/EAButton/EAButton.vue'


function changes(event: string, title: string){
  console.log(title)
}

function submit(event: any){
  event.preventDefault()
  const values = event.target
  if ((values[0].value || values[1].value ||values[2].value || values[3].value)) {
    if((values[2].value !== values[3].value) || values[0].value.replace(/^\S+@\S+\.\S+$/) !== 'undefined') {
      console.log('error')
    } else {
      // TODO добавить обработку
      console.log('ok!')
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
    <EAInput :likes="1" title="Email"></EAInput>
    <EAInput :likes="1" title="Login"></EAInput>
    <EAInput :likes="1" title="Password"></EAInput>
    <EAInput :likes="1" title="Repeat password"></EAInput>
    <EAButton title="Submit" type="submit"></EAButton>
  </form>

</template>

<style scoped>
form{
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>