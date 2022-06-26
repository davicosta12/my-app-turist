import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserModelDto from '../../Services/User/dto/UserModelDto';
import GetGroupDto from '../../Services/Group/dto/GetGroupDto';
import GetGuideDto from '../../Services/Guide/dto/GetGuideDto';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';

import { RootState } from '../store';

export interface ParamsState {
  activeUser: UserModelDto,
  groups: GetGroupDto[];
  turists: GetTuristDto[];
  guides: GetGuideDto[];
}

export const initialState: ParamsState = {
  activeUser: {} as UserModelDto,
  groups: [],
  turists: [],
  guides: [],
}
export const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setActiveUser: (state, { payload }: PayloadAction<any>) => {
      localStorage.setItem('activeUser', JSON.stringify({ ...payload }));
      state.activeUser = { ...payload };
    },
    setGroups: (state, { payload }: PayloadAction<GetGroupDto[]>) => {
      state.groups = [...payload];
    },
    setTurists: (state, { payload }: PayloadAction<GetTuristDto[]>) => {
      state.turists = [...payload];
    },
    setGuides: (state, { payload }: PayloadAction<GetGuideDto[]>) => {
      state.guides = [...payload];
    }
  },
})

export const {
  setActiveUser,
  setGroups,
  setTurists,
  setGuides,
} = paramsSlice.actions;
export const paramsReducer = paramsSlice.reducer;
export const paramsSelector = (state: RootState) => state.params;
