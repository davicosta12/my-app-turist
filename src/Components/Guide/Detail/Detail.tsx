import { FunctionComponent, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Field, Form } from 'react-final-form';
import { createForm } from 'final-form';
import { GetGuideDto } from '../Guide';
import { GuideValidators } from './validators';
import FinalInputText from '../../../_commons/FinalForm/InputText';
import FinalInputMask from '../../../_commons/FinalForm/InputMask';

interface Props {
  guide: GetGuideDto;
  openDetail: boolean;
  createMode: boolean;
  loading?: boolean;
  onCreate: (guide: GetGuideDto) => void;
  onUpdate: (guide: GetGuideDto) => void;
  onClose: () => void;
}

const GuideForm: FunctionComponent<Props> = props => {

  const {
    onCreate,
    onUpdate,
    onClose,
    createMode,
    loading,
    openDetail,
    guide,
  } = props;

  const formRef = useRef(createForm({
    onSubmit: () => { },
    validate: GuideValidators
  }));

  useEffect(() => {
    guide?.id
      ? formRef.current.initialize({ ...guide } as GetGuideDto)
      : formRef.current.reset({} as GetGuideDto);
  }, [guide, openDetail]);

  const handleSubmit = (values: GetGuideDto) => {
    createMode
      ? onCreate(values)
      : onUpdate(values);
  }

  const renderFooter = (values: GetGuideDto, valid: boolean, pristine: boolean) => <div className="grid">
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
        validate={GuideValidators}
        onSubmit={() => { }}
        render={({
          ...renderProps
        }) => <Dialog
          header={`${createMode ? "Adicionar" : "Editar"} Guia`}
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
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="description"
                  label="Descrição"
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

export default GuideForm;