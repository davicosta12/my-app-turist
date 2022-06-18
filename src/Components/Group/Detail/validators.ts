import {  requiredFieldMsg } from '../../../Misc/utils';
import GetGroupDto from '../../../Services/Group/dto/GetGroupDto';

export const GroupValidators = (values: GetGroupDto) => {
  const errors = {} as any;
  if (!values.place) errors.place = requiredFieldMsg;

  return errors;
}