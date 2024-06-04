import { $api } from '@/api/consts'
import type { Lesson } from '@/types/lessonTypes'

export default class UserService {
  private static readonly registration = '/registration';
  private static readonly login = '/login';
  private static readonly userInfo = '/user';

  static async getRegistration(data:any) {
    return $api.post(this.registration, data);
  }

  static async getLogin(data:any) {
    return $api.post(this.login, data);
  }

  static async getUserInfo(uuid:string){
    return $api.get(`/user/${uuid}`)
  }

  static async completeLesson(data: Lesson, money:number, uuid:string) {
    return $api.patch(`${this.userInfo}/${uuid}/complete_lesson`, {...data, money: money})
  }
  static async removeHeart(data, uuid:string) {
    return $api.patch(`${this.userInfo}/${uuid}/remove_heart`, { number: data })
  }
}
