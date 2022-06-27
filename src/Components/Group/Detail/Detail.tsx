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
import { RootState, useAppSelector } from '../../../reducers/store';

interface Props {
  group: GetGroupDto;
  openDetail: boolean;
  createMode?: boolean;
  isHome?: boolean;
  loading?: boolean;
  onCreate?: (group: GetGroupDto) => void;
  onUpdate?: (group: GetGroupDto) => void;
  onAssociate?: (values: GetTuristDto[], groupId: number) => void;
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

  const activeUser = useAppSelector((state: RootState) => state.params.activeUser);
  const groups = useAppSelector((state: RootState) => state.params.groups);
  const guides = useAppSelector((state: RootState) => state.params.guides);

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
    !props.isHome
      ? (createMode
        ? onCreate?.(values)
        : onUpdate?.(values)
      )
      : props.onAssociate?.([...group?.turists, {
        id: activeUser.id,
        password: activeUser.password,
        birthDate: activeUser.birthDate,
        cellphone: activeUser.cellphone,
        document: activeUser.document,
        email: activeUser.email,
        genrer: activeUser.genrer,
        idGrupo: group.id,
        name: activeUser.name,
        tipo: activeUser.tipo,
        isAdmin: false,
        isActive: false
      }], group.id);
  }

  const getValidators = (valid: boolean, pristine: boolean) => {

    let turistFind = false;

    if (props.isHome) {

      for (let group of groups) {

        const turist = group.turists?.filter(t => t.id === activeUser.id)[0];

        if (turist) {
          turistFind = true;
          break;
        }
      }

    }

    return !props.isHome ? !valid || pristine : turistFind
  }

  const handleCreateOptions = () => {

    const guideIds = groups.map(g => g.guide.id);

    const newGuides = guides.filter(g => !guideIds.includes(g.id));

    return newGuides.map((item: GetGuideDto) => Object.assign({}, { label: item.name, value: item }))
  }

  const renderFooter = (values: GetGroupDto, valid: boolean, pristine: boolean) => <div className="grid">
    <div className="col-12 flex justify-content-end">
      <Button
        label="Fechar"
        className="lg:flex-grow-0 flex-grow-1 p-button-sm p-button-secondary"
        onClick={onClose}
      />
      {(activeUser.tipo === "T" || !props.isHome) && <Button
        label={props.isHome ? "Participar" : "Salvar"}
        className="lg:flex-grow-0 flex-grow-1 p-button-sm p-button-primary ml-1"
        onClick={() => handleSubmit(values)}
        disabled={getValidators(valid, pristine) || group.turists?.length === MAX_GROUP_LENGHT}
        loading={loading}
      />}
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
          className="w-4"
          visible={openDetail}
          onHide={onClose}
          breakpoints={{ '960px': '75vw' }}
          maximizable
          footer={() => renderFooter(renderProps.values, renderProps.valid, renderProps.pristine)}
        >
            <div className="formgrid grid">
              {!createMode && <div className="field col-12 ">
                <Field
                  name="id"
                  label="Id Grupo"
                  component={FinalInputText}
                  required
                  readOnly
                />
              </div>}
              <div className={`field col-12`}>
                <Field
                  name="guide"
                  label="Guia"
                  options={(!createMode || props.isHome) ? guides.map((item: GetGuideDto) => Object.assign({}, { label: item.name, value: item })) : handleCreateOptions()}
                  component={FinalDropdown}
                  required
                  disabled={props.isHome}
                />
              </div>
              <div className={`field col-12`}>
                <Field
                  name="imageUrl"
                  label="URL da Imagem"
                  component={FinalInputText}
                  required
                  disabled={props.isHome}
                />
              </div>
              <div className={`field col-12`}>
                <Field
                  name="place"
                  label="Lugar"
                  component={FinalInputText}
                  required
                  readOnly={props.isHome}
                />
              </div>
              {props.isHome && <div className="field col-12">
                <Field
                  name="turists"
                  label="Turistas"
                  options={group.turists?.map((item: GetTuristDto) => Object.assign({}, { label: item.name, value: item }))}
                  component={FinalListbox}
                  required
                  disabled={props.isHome || group.turists?.length >= MAX_GROUP_LENGHT}
                />
              </div>}
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