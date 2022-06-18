import { AxiosResponse } from "axios";
import { Params } from "../../Components/Guide/Guide";
import HttpService from "../HttpService";
import GetGuideDto from "./dto/GetGuideDto";
import PostGuideDto from "./dto/PostGuideDto";
import PutGuideDto from "./dto/PutGuideDto";

export default class GuideService extends HttpService {

  getGuides(params: Params): Promise<GetGuideDto[]> {

    let query = ''
    if (params.id) query += `id=${params.id}&`;
    if (params.name) query += `name=${params.name}&`;
    if (params.city) query += `city=${params.city}&`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/guides?${query}`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getGuideById(id: number): Promise<GetGuideDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/guides/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createGuide(guide: PostGuideDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/guides`, guide)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateGuide(guide: PutGuideDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/guides/${id}`, guide)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteGuide(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/guides/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}