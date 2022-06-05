import { cpfIsValid, invalidStringMsg, requiredFieldMsg } from '../../../Misc/utils';
import GetTuristDto from '../../../Services/Turist/dto/GetTuristDto';

export const TuristValidators = (values: GetTuristDto) => {
  const errors = {} as any;
  if (!values.name) errors.name = requiredFieldMsg;
  if (!cpfIsValid(values.document || '')) errors.document = invalidStringMsg;
  if (!values.birthDate) errors.birthDate = requiredFieldMsg;
  return errors;
}