import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import GetGroupDto from '../../Services/Group/dto/GetGroupDto';
import GetGuideDto from '../../Services/Guide/dto/GetGuideDto';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';

import { RootState } from '../store';

interface UserModel {
  id: number,
  name: string,
  birthDate: string
  genrer: string,
  cellphone: string,
  document: string
}

export interface ParamsState {
  activeUser: UserModel,
  groups: GetGroupDto[];
  turists: GetTuristDto[];
  guides: GetGuideDto[];
}

export const initialState: ParamsState = {
  activeUser: {
    id: 13,
    name: "DAVI",
    birthDate: "2000-06-13T03:00:00.000Z",
    genrer: "Masculino",
    cellphone: "972884044",
    document: "511.891.158-32"
  },
  groups: [],
  turists: [],
  guides: [],
}
export const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setActiveUser: (state, { payload }: PayloadAction<UserModel>) => {
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
