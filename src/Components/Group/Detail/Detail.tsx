import { FunctionComponent, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Field, Form } from 'react-final-form';
import { createForm } from 'final-form';
import { GroupValidators } from './validators';
import FinalInputText from '../../../_commons/FinalForm/InputText';
import GetGroupDto from '../../../Services/Group/dto/GetGroupDto';

interface Props {
  group: GetGroupDto;
  openDetail: boolean;
  createMode: boolean;
  loading?: boolean;
  onCreate: (group: GetGroupDto) => void;
  onUpdate: (group: GetGroupDto) => void;
  onClose: () => void;
}

const GroupForm: FunctionComponent<Props> = props => {

  const {
    onCreate,
    onUpdate,
    onClose,
    createMode,
    loading,
    openDetail,
    group,
  } = props;

  const formRef = useRef(createForm({
    onSubmit: () => { },
    validate: GroupValidators
  }));

  useEffect(() => {
    group?.id
      ? formRef.current.initialize({ ...group } as GetGroupDto)
      : formRef.current.reset({} as GetGroupDto);
  }, [group, openDetail]);

  const handleSubmit = (values: GetGroupDto) => {
    createMode
      ? onCreate(values)
      : onUpdate(values);
  }

  const renderFooter = (values: GetGroupDto, valid: boolean, pristine: boolean) => <div className="grid">
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
        validate={GroupValidators}
        onSubmit={() => { }}
        render={({
          ...renderProps
        }) => <Dialog
          header={`${createMode ? "Adicionar" : "Editar"} Grupo`}
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
                  name="place"
                  label="Lugar"
                  component={FinalInputText}
                  required
                />
              </div>
              <div className="field col-12 lg:col-6">
                <Field
                  name="imageUrl"
                  label="Url da Imagem"
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

export default GroupForm;