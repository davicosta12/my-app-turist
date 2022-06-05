import { AxiosResponse } from "axios";
import { Params } from "../../Components/Turist/Turist";
import HttpService from "../HttpService";
import GetTouristDto from "./dto/GetTuristDto";
import PostTouristDto from "./dto/PostTuristDto";
import PutTouristDto from "./dto/PutTuristDto";

export default class TuristService extends HttpService {

  getTurists(params: Params): Promise<GetTouristDto[]> {

    let query = ''
    if (params.id) query += `id=${params.id}&`;
    if (params.name) query += `name=${params.name}&`;
    if (params.genrer) query += `genrer=${params.genrer}&`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/turists?${query}`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getToristById(id: number): Promise<GetTouristDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/turists/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createTurist(tourist: PostTouristDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/turists`, tourist)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateTurist(tourist: PutTouristDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/turists/${id}`, tourist)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteTurist(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/turists/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}