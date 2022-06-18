import { cpfIsValid, invalidStringMsg, requiredFieldMsg } from '../../../Misc/utils';
import { GetGuideDto } from '../Guide';

export const GuideValidators = (values: GetGuideDto) => {
  const errors = {} as any;
  if (!values.name) errors.name = requiredFieldMsg;
  if (!values.email) errors.email = requiredFieldMsg;
  if (!cpfIsValid(values.document || '')) errors.document = invalidStringMsg;

  return errors;
}