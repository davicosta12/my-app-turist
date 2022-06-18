import { cpfIsValid, invalidStringMsg, requiredFieldMsg } from '../../../Misc/utils';
import GetGuideDto from '../../../Services/Guide/dto/GetGuideDto';

export const GuideValidators = (values: GetGuideDto) => {
  const errors = {} as any;
  if (!values.name) errors.name = requiredFieldMsg;
  if (!values.city) errors.city = requiredFieldMsg;
  if (!cpfIsValid(values.document || '')) errors.document = invalidStringMsg;

  return errors;
}