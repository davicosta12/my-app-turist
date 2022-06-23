import { Params as TuristParams } from "../Components/Turist/Turist";
import { Params as GuideParams } from "../Components/Guide/Guide";
import { Params as GroupParams } from "../Components/Group/Group";
import { store } from "../reducers/store";
import GroupService from "../Services/Group/GroupService";
import GuideService from "../Services/Guide/GuideService";
import TuristService from "../Services/Turist/TuristService";
import { setGroups, setGuides, setTurists } from "../reducers/params/paramsSlice";

const GetGlobalParamsHelper = () => {

  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      const turistService = new TuristService(token);
      const groupService = new GroupService(token);
      const guideService = new GuideService(token);

      Promise.allSettled([
        guideService.getGuides({} as GuideParams),
        groupService.getGroups({} as GroupParams),
        turistService.getTurists({} as TuristParams),
      ])
        .then(results => results.forEach((res, i) => res.status === 'fulfilled'
          ? dispatchAction(res.value, i)
          : reject(res.reason)
        ))
        .then(() => resolve(null))
    }
    catch (err) {
      reject(err)
    }
  })
}

export default GetGlobalParamsHelper

const dispatchAction = (res: any, index: number) => {
  const { dispatch } = store;
  switch (index) {
    case 0: dispatch(setGuides(res)); break;
    case 1: dispatch(setGroups(res)); break;
    case 2: dispatch(setTurists(res)); break;
    default:
  }
}