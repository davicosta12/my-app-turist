import { requiredFieldMsg } from '../../../Misc/utils';
import GetGroupDto from '../../../Services/Group/dto/GetGroupDto';

export const GroupValidators = (values: GetGroupDto) => {
  const errors = {} as any;
  if (!values.guide?.id) errors.guide = requiredFieldMsg;
  if (!values.place) errors.place = requiredFieldMsg;
  if (!values.turists?.length) errors.turists = requiredFieldMsg;

  return errors;
}