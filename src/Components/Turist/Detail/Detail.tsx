import { FunctionComponent, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Field, Form } from 'react-final-form';
import { createForm } from 'final-form';
import { TuristValidators } from './validators';
import FinalInputText from '../../../_commons/FinalForm/InputText';
import FinalInputMask from '../../../_commons/FinalForm/InputMask';
import GetTuristDto from '../../../Services/Turist/dto/GetTuristDto';
import FinalDropdown from '../../../_commons/FinalForm/DropDown';
import FinalCalendar from '../../../_commons/FinalForm/Calendar';
import FinalPassWord from '../../../_commons/FinalForm/Password';

interface Props {
  turist: GetTuristDto;
  openDetail: boolean;
  createMode: boolean;
  loading?: boolean;
  onCreate: (turist: GetTuristDto) => void;
  onUpdate: (turist: GetTuristDto) => void;
  onClose: () => void;
}

const TuristForm: FunctionComponent<Props> = props => {

  const {
    onCreate,
    onUpdate,
    onClose,
    createMode,
    loading,
    openDetail,
    turist,
  } = props;

  const formRef = useRef(createForm({
    onSubmit: () => { },
    validate: TuristValidators
  }));

  useEffect(() => {
    turist?.id
      ? formRef.current.initialize({ ...turist } as GetTuristDto)
      : formRef.current.reset({} as GetTuristDto);
  }, [turist, openDetail]);

  const handleSubmit = (values: GetTuristDto) => {
    createMode
      ? onCreate(values)
      : onUpdate(values);
  }

  const renderFooter = (values: GetTuristDto, valid: boolean, pristine: boolean) => <div className="grid">
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
        disabled={!valid || pristine}
        loading={loading}
      />
    </div>
  </div>

  return (
    <>
      <Form
        form={formRef.current}
        validate={TuristValidators}
        onSubmit={() => { }}
        render={({
          ...renderProps
        }) => <Dialog
          header={`${createMode ? "Adicionar" : "Editar"} Turista`}
          className="w-6"
          visible={openDetail}
          onHide={onClose}
          breakpoints={{ '960px': '75vw' }}
          maximizable
          footer={() => renderFooter(renderProps.values, renderProps.valid, renderProps.pristine)}
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
}

export default TuristForm;