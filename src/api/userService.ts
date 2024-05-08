import { $api } from '@/api/consts'

export default class UserService {
  private static readonly registration = '/registration';
  private static readonly login = '/login';

  static async getRegistration(data:any) {
    return $api.post(this.registration, data);
  }

  static async getLogin(data:any) {
    return $api.post(this.login, data);
  }
}
