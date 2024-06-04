import { defineStore } from 'pinia'
import LessonsService from '@/api/lessonsService'

export const useLessonsStore = defineStore('lessonsStore', {
  state: () => ({
    lessons: [],
  }),
  actions: {
    async getLessons() {
      try {
        return LessonsService.getLessons()
      } catch (e) {
        console.log(e)
      }
    },
    async getLesson(id){
      try {
        return LessonsService.getLesson(id)
      } catch (e) {
        console.log(e)
      }
    },
    async getPhoto(query: string) {
      try {
        return LessonsService.getPhoto(query)
      } catch (e){
        console.log(e)
      }
    }
  }
})