import { defineStore } from 'pinia'
import UserService from '@/api/userService'

export const useUserStore = defineStore('userStore', {
  state: () => ({}),
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
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
})