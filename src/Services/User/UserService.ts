import { AxiosResponse } from "axios";
import HttpService from "../HttpService";
import UserModelDto from "./dto/UserModelDto";

export default class UserService extends HttpService {

  createUser(user: UserModelDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/auth/register`, user)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}