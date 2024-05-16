import { defineStore } from 'pinia'
import UserService from '@/api/userService'
import { useMovieStore } from '@/stores/counter'
import type { Lesson } from '@/types/lessonTypes'


export const useUserStore = defineStore('userStore', {
  state: () => ({
    movieStore: useMovieStore()
  }),
  actions: {

    async createUser(data: registrationUserI) {
      try {
        const response = await UserService.getRegistration(data)

        console.log(response)
      } catch (error) {
        console.log(error) // TODO Сделать обработку ошибок 401 и 422 с бека
      }
    },
    async loginUser(data: { email: string; password: string }) {
      try {
        const response = await UserService.getLogin(data)
        localStorage.setItem('id', response.data._id)
        return response
      } catch (error) {

        this.movieStore.setError(true, 'Неверный логин или пароль')
      }
      throw new Error()
    },

    async getUserInfo() {
      try{
        const uuid = localStorage.getItem('id')
        return await UserService.getUserInfo(uuid || '')
      } catch (e){
        this.movieStore.setError(true, 'Пользователь не найден')
      }
      throw new Error()
    },
    async completeLesson(data: Lesson, money:number){
      try{
        return await UserService.completeLesson(data, money, localStorage.getItem('id') || '')
      } catch (e){
        this.movieStore.setError(true, 'Пользователь не найден')
      }
      throw new Error()
    }
  }
})