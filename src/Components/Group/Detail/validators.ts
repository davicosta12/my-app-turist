import { cpfIsValid, invalidStringMsg, requiredFieldMsg } from '../../../Misc/utils';
import { GetGroupDto } from '../Group';

export const GroupValidators = (values: GetGroupDto) => {
  const errors = {} as any;
  if (!values.name) errors.name = requiredFieldMsg;
  if (!values.email) errors.email = requiredFieldMsg;
  if (!cpfIsValid(values.document || '')) errors.document = invalidStringMsg;

  return errors;
}