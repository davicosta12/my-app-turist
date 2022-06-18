import { FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Dropdown } from 'primereact/dropdown';

interface Props extends FieldRenderProps<any, HTMLElement> {
    label: string;
    options: any[];
}

const FinalDropdown: FunctionComponent<Props> = ({
    input: { name, value, onChange },
    meta: { touched, active, initial, error, dirty, },
    label,
    options,
    createMode,
    ...custom
}) => {
    const defaultClassName = 'inputfield p-inputtext-sm w-full';
    return <>
        {custom.required && <span style={{ color: 'red' }}>*</span>}
        <label htmlFor={name}> {label} </label>
        <Dropdown
            inputId={name}
            name={name}
            value={value}
            onChange={e => onChange(e.target.value || null)}
            options={options}
            {...custom}
            className={`${custom?.className || defaultClassName} ${error ? 'p-invalid' : undefined} ${dirty && initial !== undefined ? 'dirty' : ''}`}
        // tooltip={error ? `${label} ${error}` : undefined}
        // tooltipOptions={{ showDelay: 150, hideDelay: 50, position: 'top' }}
        />
        <small id="username-help" className="p-error">{error ? `${error}` : undefined}</small>
    </>
}

FinalDropdown.defaultProps = {
}

export default FinalDropdown;