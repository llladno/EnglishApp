import { $api, $apiPhoto } from '@/api/consts'

export default class LessonsService {
  private static readonly lessons = '/lessons';
  private static readonly photoEnd = '&image_type=photo&pretty=true'

  static async getLessons() {
    return $api.get(this.lessons);
  }
  static async getLesson(id: string){
    return $api.get(`${this.lessons}/${id}`)
  }
  static async getPhoto(query: string) {
    return $apiPhoto.get(`?key=43739713-5853d22ee946b4f02485c3114&q=${query}${this.photoEnd}`)
  }
}
