import { FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { InputText } from 'primereact/inputtext';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

const FinalInputText: FunctionComponent<Props> = ({
  input: { name, value, type, onChange },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}) => {

  const defaultClassName = 'inputfield p-inputtext-sm w-full';
  const inputType = custom?.type || type;

  return <>
    {custom.required && <span style={{ color: 'red' }}>*</span>}
    <label htmlFor={name}> {label} </label>
    <InputText
      id={name}
      name={name}
      value={value}
      type={type}
      autoComplete="off"
      onChange={(e: any) => onChange(inputType === 'number' ? +e.target.value : (e.target.value || null))}
      {...custom}
      className={`${custom?.className || defaultClassName} ${error ? 'p-invalid' : undefined} ${dirty && initial !== undefined ? 'dirty' : ''}`}
    />
    {error ? <small id="username-help" className="p-error">{error}</small> : null}
  </>
}

FinalInputText.defaultProps = {

}

export default FinalInputText;