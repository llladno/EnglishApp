<script setup lang="ts">


import { onMounted, reactive, ref } from 'vue'
import { useLessonsStore } from '@/stores/lessonsStore'
import { useRouter } from 'vue-router'
const navigation = useRouter()

let lessons = ref([])
let category = ref([])
onMounted(async () => {
  const result = await useLessonsStore().getLessons()
  lessons.value = result?.data
})
</script>

<template>

  <div v-if="lessons.length !== 0" v-for="(lesson, index) in lessons" :key="index">
    <h3 @click="category = lesson">{{index}}</h3>
    {{console.log(lesson)}}
  </div>
  <div v-else>
    <h1>Error</h1>
  </div>
  <div v-if="category.length !== 0">
    <div v-for="(lesson, index) in category" :key="index">
      <h4 @click="navigation.push(`/lesson/${lesson._id}`)">{{lesson.theme}} </h4>
    </div>
  </div>

</template>

<style scoped>
h3{
  margin: 10px;
  padding: 10px;
  background: #986FCA;
  border-radius: 10px;
}
h3:hover{
  background: #775aa4;
}

h4{
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  background: #5475fa;
}
</style>