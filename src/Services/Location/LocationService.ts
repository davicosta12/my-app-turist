import { AxiosResponse } from "axios";
import HttpService from "../HttpService";
import GetLocationDto from "./dto/GetLocationDto";

export default class LocationService extends HttpService {

  getLocations(): Promise<GetLocationDto[]> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/locals`)
        .then((res: any) => resolve(res.data || []))
        .catch((err: AxiosResponse<any>) => reject(err))
    });
  }

}