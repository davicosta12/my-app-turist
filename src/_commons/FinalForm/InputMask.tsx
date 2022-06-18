import { FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { InputMask } from 'primereact/inputmask';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

const FinalInputMask: FunctionComponent<Props> = ({
  input: { name, value, type, onChange },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}) => {
  const defaultClassName = 'inputfield p-inputtext-sm w-full';
  return <>
    {custom.required && <span style={{ color: 'red' }}>*</span>}
    <label htmlFor={name}> {label} </label>
    <InputMask
      id={name}
      name={name}
      value={value}
      onChange={e => onChange(e.value)}
      {...custom}
      className={`${custom?.className || defaultClassName} ${error ? 'p-invalid' : undefined} ${dirty && initial !== undefined ? 'dirty' : ''}`}
    />
    <small id="username-help" className="p-error">{error ? `${error}` : undefined}</small>
  </>
}

FinalInputMask.defaultProps = {
}

export default FinalInputMask;