import { useDispatch } from "react-redux";
import { setActiveUser } from "../reducers/params/paramsSlice";
import { store } from "../reducers/store";
import AuthService from "./AuthService";
import GetGlobalParamsHelper from "./GetGlobalParamsHelper";

class AuthHelper {

  static authenticate = (email: string, password: string) => {

    return new Promise(async (resolve, reject) => {
      try {
        const { dispatch } = store;
        const authResponse = await new AuthService().getToken(email, password);
        dispatch(setActiveUser(authResponse.dadoslogin));
        await GetGlobalParamsHelper();
        return resolve(null);
      }
      catch (err) {
        reject(err);
      }
    })
  }

  static restoreAuthFromCache = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { dispatch } = store;
        const activeUser = localStorage.getItem('activeUser');
        dispatch(setActiveUser(JSON.parse(activeUser || '')));
        await GetGlobalParamsHelper();
        return resolve(null);
      }
      catch (err) {
        reject("Não foi possível restaurar os dados de autenticação");
      }
    })
  }

}

export default AuthHelper