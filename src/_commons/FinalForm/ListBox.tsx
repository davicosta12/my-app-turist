import { FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { ListBox } from 'primereact/listbox';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
  options: any[];
}

const FinalListbox: FunctionComponent<Props> = ({
  input: { value, onChange },
  meta: { touched, active, initial, error, dirty },
  label,
  options,
  singleSelection,
  ...custom
}) => {
  return <>
    {custom.required && <span style={{ color: 'red' }}>*</span>}
    <label> {label} </label>
    <ListBox
      {...custom}
      value={value}
      onChange={e => onChange(e.target.value)}
      options={options}
      multiple={!singleSelection}
      className={custom?.className}
    // tooltip={error ? `${label} ${error}` : undefined}
    // tooltipOptions={{ showDelay: 150, hideDelay: 50, position: 'top' }}
    />
    <small id="username-help" className="p-error">{error ? `${error}` : undefined}</small>
  </>
}

export default FinalListbox;

FinalListbox.defaultProps = {

}