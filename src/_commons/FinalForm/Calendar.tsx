import { FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Calendar } from 'primereact/calendar';
import { requiredFieldMsg } from '../../Misc/utils';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

const FinalCalendar: FunctionComponent<Props> = ({
  input: { name, value, type, onChange },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}) => {
  const defaultClassName = 'inputfield p-inputtext-sm w-full';
  return <>
    {custom.required && <span style={{ color: 'red' }}>*</span>}
    <label htmlFor={name}> {label} </label>
    <Calendar
      id={name}
      inputId={name}
      name={name}
      value={value ? new Date(value) : undefined}
      onChange={e => onChange(e.target.value)}
      selectionMode={custom?.selectionMode}
      locale='pt-br'
      placeholder="DD/MM/YYYY"
      dateFormat="dd/mm/yy"
      showIcon
      showButtonBar
      readOnlyInput
      {...custom}
      className={`${custom?.className || defaultClassName} ${error ? 'p-invalid' : undefined} ${dirty && initial !== undefined ? 'dirty' : ''}`}
    // tooltip={error ? `${label} ${error}` : undefined}
    // tooltipOptions={{ showDelay: 150, hideDelay: 50, position: 'top' }}
    />
    <small id="username-help" className="p-error">{error ? `${error}` : undefined}</small>
  </>
}

FinalCalendar.defaultProps = {
  showIcon: true,
  readOnlyInput: true,
}

export default FinalCalendar;