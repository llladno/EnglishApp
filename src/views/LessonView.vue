<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useLessonsStore } from '@/stores/lessonsStore'
import EALessonCard from '@/components/layout/EALessonCard/EALessonCard.vue'
import type { Lesson } from '@/types/lessonTypes'
import IconLoading from '@/components/icons/IconLoading.vue'
import IconClose from '@/components/icons/IconClose.vue'
import EAIconButton from '@/components/common/EAIconButton/EAIconButton.vue'

const route = useRoute()
const navigation = useRouter()
const lesson = ref<Lesson>()

onMounted(() => {
  useLessonsStore().getLesson(route.params.id).then((res) => {
    lesson.value = res.data
    console.log(lesson.value)
  })
})
</script>

<template>
  <div v-if="lesson">
    <div class="lessonHeader">
      <div>
        <h1>{{ lesson.category }}</h1>
        <h3>{{ lesson.theme }}</h3>
      </div>
      <EAIconButton @click="navigation.push('/account')">
        <IconClose></IconClose>

      </EAIconButton>
    </div>
    <EALessonCard :lesson="lesson"></EALessonCard>

  </div>
  <div v-else>
    <IconLoading />
  </div>

</template>

<style scoped>
.lessonHeader {
  margin: 10px 40px;
  display: flex;
  justify-content: space-between;
}
</style>