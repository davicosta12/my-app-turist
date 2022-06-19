import { FunctionComponent, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Field, Form } from 'react-final-form';
import { createForm } from 'final-form';
import { GroupValidators } from './validators';
import FinalInputText from '../../../_commons/FinalForm/InputText';
import GetGroupDto from '../../../Services/Group/dto/GetGroupDto';
import FinalDropdown from '../../../_commons/FinalForm/DropDown';
import GetGuideDto from '../../../Services/Guide/dto/GetGuideDto';
import FinalListbox from '../../../_commons/FinalForm/ListBox';
import GetTuristDto from '../../../Services/Turist/dto/GetTuristDto';
import { MAX_GROUP_LENGHT } from '../../../Env/env';

interface Props {
  group: GetGroupDto;
  guides: GetGuideDto[];
  turists: GetTuristDto[];
  openDetail: boolean;
  createMode?: boolean;
  isHome?: boolean;
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
    guides,
    turists,
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
        label={props.isHome ? "Participar" : "Salvar"}
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
          header={`${props.isHome ? 'Detalhes' : createMode ? "Adicionar" : "Editar"} Grupo`}
          className="w-6"
          visible={openDetail}
          onHide={onClose}
          breakpoints={{ '960px': '75vw' }}
          maximizable
          footer={() => renderFooter(renderProps.values, renderProps.valid, renderProps.pristine)}
        >
            <div className="formgrid grid">
              {!createMode && <div className="field col-12 lg:col-3">
                <Field
                  name="id"
                  label="Id Grupo"
                  component={FinalInputText}
                  required
                  readOnly
                />
              </div>}
              <div className={`field col-12 ${!createMode ? "lg:col-4" : "lg:col-6"}`}>
                <Field
                  name="guide"
                  label="Guia"
                  options={guides.map((item: GetGuideDto) => Object.assign({}, { label: item.name, value: item }))}
                  component={FinalDropdown}
                  required
                  disabled={props.isHome}
                />
              </div>
              <div className={`field col-12 ${!createMode ? "lg:col-5" : "lg:col-6"}`}>
                <Field
                  name="place"
                  label="Lugar"
                  component={FinalInputText}
                  required
                  readOnly={props.isHome}
                />
              </div>
              <div className="field col-12 lg:col-12">
                <Field
                  name="turists"
                  label="Turistas"
                  options={turists.map((item: GetTuristDto) => Object.assign({}, { label: item.name, value: item }))}
                  component={FinalListbox}
                  required
                  disabled={props.isHome || group.turists?.length >= MAX_GROUP_LENGHT}
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

GroupForm.defaultProps = {
  isHome: false,
}