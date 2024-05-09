<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useLessonsStore } from '@/stores/lessonsStore'
import EALessonCard from '@/components/layout/EALessonCard/EALessonCard.vue'

const navigation = useRoute()
const lesson = ref({})

onMounted(()=>{
  useLessonsStore().getLesson(navigation.params.id).then((res)=>{
    lesson.value = res.data
    console.log(lesson.value)
  })
  })
</script>

<template>
  <div v-if="lesson.settings">
    <h1>{{lesson.settings.category}}</h1>
    <h3>{{lesson.settings.theme}}</h3>
      <EALessonCard :lesson="lesson"></EALessonCard>

  </div>
  <div v-else>
    Loading
  </div>

</template>

<style scoped>

</style>