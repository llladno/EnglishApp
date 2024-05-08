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
  })
  })
</script>

<template>
  <h1>{{lesson.category}}</h1>
  <h3>{{lesson.theme}}</h3>
  <EALessonCard v-if="lesson.category" :lesson="lesson"></EALessonCard>
</template>

<style scoped>

</style>