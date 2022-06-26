import { AxiosResponse } from "axios";
import AuthRequestDto from "../Services/Auth/dto/AuthRequestDto";
import AuthResponseDto from "../Services/Auth/dto/AuthResponseDto";
import ErrorResponseDto from "../Services/Auth/dto/ErroResponseDto";
import HttpService from "../Services/HttpService";

export default class AuthService extends HttpService {

  getToken(email: string, password: string): Promise<AuthResponseDto> {
    return new Promise((resolve, reject) => {

      this.getApi().post(`/auth/login`, new AuthRequestDto(email, password))
        .then(res => {
          this.saveToken(res.data.access_token);
          resolve(res.data);
        })
        .catch((err: AxiosResponse<ErrorResponseDto>) => reject(err))
    })
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

}