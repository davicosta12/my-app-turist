import { createForm } from 'final-form';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FunctionComponent, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import GetGuideDto from '../../../Services/Guide/dto/GetGuideDto';
import UserModelDto from '../../../Services/User/dto/UserModelDto';
import FinalCalendar from '../../../_commons/FinalForm/Calendar';
import FinalDropdown from '../../../_commons/FinalForm/DropDown';
import FinalInputMask from '../../../_commons/FinalForm/InputMask';
import FinalInputText from '../../../_commons/FinalForm/InputText';
import FinalPassWord from '../../../_commons/FinalForm/Password';
import { RegistrationValidators } from './validators';

interface Props {
  openDetail: boolean;
  loading?: boolean;
  onCreate: (user: UserModelDto) => void;
  onClose: () => void;
}

const Registration: FunctionComponent<Props> = (props) => {

  const { onClose, onCreate, loading, openDetail } = props;

  const formRef = useRef(createForm({
    onSubmit: () => { },
    validate: RegistrationValidators
  }));

  const handleSubmit = (values: UserModelDto) => {
    onCreate(values)
  }


  const renderFooter = (values: UserModelDto, valid: boolean) => <div className="grid">
    <div className="col-12 flex justify-content-end">
      <Button
        label="Fechar"
        className="lg:flex-grow-0 flex-grow-1 p-button-sm p-button-secondary"
        onClick={onClose}
      />
      <Button
        label="Salvar"
        className="lg:flex-grow-0 flex-grow-1 p-button-sm p-button-primary ml-1"
        onClick={() => handleSubmit(values)}
        disabled={!valid}
        loading={loading}
      />
    </div>
  </div>

  return (
    <>
      <Form
        form={formRef.current}
        validate={RegistrationValidators}
        onSubmit={() => { }}
        render={({
          ...renderProps
        }) => <Dialog
          header={`Cadastre-se aqui`}
          className="w-6"
          visible={openDetail}
          onHide={onClose}
          breakpoints={{ '960px': '75vw' }}
          maximizable
          footer={() => renderFooter(renderProps.values, renderProps.valid)}
        >
            <div className="formgrid grid">
              <div className="field col-12 lg:col-6">
                <Field
                  name="name"
                  label="Nome"
                  component={FinalInputText}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="password"
                  label="Senha"
                  component={FinalPassWord}
                  toggleMask
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="tipo"
                  label="Tipo do Usuário"
                  options={[
                    { label: "Guia", value: "G" },
                    { label: "Turista", value: "T" }]}
                  component={FinalDropdown}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="document"
                  label="CPF"
                  mask="999.999.999-99"
                  component={FinalInputMask}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="email"
                  label="Email"
                  component={FinalInputText}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="genrer"
                  label="Gênero"
                  options={[
                    { label: "Masculino", value: "Masculino" },
                    { label: "Feminino", value: "Feminino" }]}
                  component={FinalDropdown}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="birthDate"
                  label="Data de Aniversário"
                  component={FinalCalendar}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="cellphone"
                  label="Celular"
                  component={FinalInputText}
                />
              </div>
            </div>
          </Dialog>
        }
      />
    </>
  );
};

export default Registration;
