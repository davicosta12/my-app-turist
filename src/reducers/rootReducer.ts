import { combineReducers } from '@reduxjs/toolkit';
import { paramsReducer } from './params/paramsSlice';

const appReducer = combineReducers({
  params: paramsReducer,
});

/* rootReducer -> Lógica da maneira antiga. Precisa mudar! */
const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;