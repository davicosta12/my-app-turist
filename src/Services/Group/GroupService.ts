import { AxiosResponse } from "axios";
import { Params } from "../../Components/Group/Group";
import HttpService from "../HttpService";
import GetGroupDto from "./dto/GetGroupDto";
import PostGroupDto from "./dto/PostGroupDto";
import PutGroupDto from "./dto/PutGroupDto";


export default class GroupService extends HttpService {

  getGroups(params: Params): Promise<GetGroupDto[]> {

    let query = ''
    if (params.id) query += `id=${params.id}&`;
    if (params.guideName) query += `guide.name=${params.guideName}&`;
    if (params.place) query += `place=${params.place}&`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/groups?${query}`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  getGroupById(id: number): Promise<GetGroupDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/groups/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  createGroup(group: PostGroupDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/groups`, group)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  updateGroup(group: PutGroupDto, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/groups/${id}`, group)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  patchGroup(value: any, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().patch(`/groups/${id}`, value)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

  deleteGroup(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/groups/${id}`)
        .then((res: any) => resolve(res.data))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}