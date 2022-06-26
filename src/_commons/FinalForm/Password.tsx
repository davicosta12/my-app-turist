import { FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import './Password.scss';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

const FinalPassWord: FunctionComponent<Props> = ({
  input: { name, value, type, onChange },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}) => {

  const defaultClassName = 'inputfield p-inputtext-sm w-full';

  const header = <h6>Escolha uma Senha</h6>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Sugestões</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>Pelo menos uma minúscula</li>
        <li>Pelo menos uma maiúscula</li>
        <li>Pelo menos um número</li>
        <li>No mínimo 8 caracteres</li>
      </ul>
    </>
  );

  return <>
    {custom.required && <span style={{ color: 'red' }}>*</span>}
    <label htmlFor={name}> {label} </label>
    <Password
      id={name}
      inputId={name}
      name={name}
      value={value}
      autoComplete="off"
      onChange={(e: any) => onChange(e.target.value)}
      header={header}
      footer={footer}
      {...custom}
      className={`${custom?.className || defaultClassName} ${error ? 'p-invalid' : undefined} ${dirty && initial !== undefined ? 'dirty' : ''}`}
    />
    {error ? <small id="username-help" className="p-error">{error}</small> : null}
  </>
}

FinalPassWord.defaultProps = {

}

export default FinalPassWord;