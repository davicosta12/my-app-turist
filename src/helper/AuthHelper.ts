import GetGlobalParamsHelper from "./GetGlobalParamsHelper";

class AuthHelper {

  static authenticate = () => {
    return new Promise(async (resolve, reject) => {
      try {
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
        await GetGlobalParamsHelper();
        return resolve(null);
      }
      catch (err) {
        reject(err);
      }
    })
  }

}

export default AuthHelper