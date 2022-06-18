import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../environment';

export default class HttpService {

  protected config: AxiosRequestConfig = {
    baseURL: `http://${this.getSubdomain()}.${API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  constructor(token?: string | null) {
    if (token) {
      this.setToken(token);
    }
  }

  protected getApi(): AxiosInstance {
    const http = axios.create(this.config);

    http.interceptors.response.use(response => {
      return response;
    }, (error) => {
      return Promise.reject(error.response);
    });

    return http;
  }

  protected setToken(token?: string) {
    if (token && this.config.headers) {
      this.config.headers['Authorization'] = 'Bearer ' + token;
    }
  }

  protected unsetToken() {
    if (this.config.headers) {
      delete this.config.headers['Authorization'];
    }
  }

  private getSubdomain() {
    const subdomain = /^[^\.]+/.exec(window.location.hostname);
    return subdomain ? subdomain[0] : null;
  }

}