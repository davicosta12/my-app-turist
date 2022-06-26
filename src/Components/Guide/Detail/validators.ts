import { trim } from 'lodash';
import { cpfIsValid, invalidStringMsg, requiredFieldMsg } from '../../../Misc/utils';
import GetGuideDto from '../../../Services/Guide/dto/GetGuideDto';

export const GuideValidators = (values: GetGuideDto) => {

  const errors = {} as any;
  if (!trim(values.name)) errors.name = requiredFieldMsg;
  if (!trim(values.password)) errors.password = requiredFieldMsg;
  if (!trim(values.email)) errors.email = requiredFieldMsg;
  if (!cpfIsValid(values.document || '')) errors.document = invalidStringMsg;
  if (!trim(values.birthDate)) errors.birthDate = requiredFieldMsg;
  if (!trim(values.genrer)) errors.genrer = requiredFieldMsg;

  return errors;
}