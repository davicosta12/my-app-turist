import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import DataTable from '../../_commons/Datatable/Datatable';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import MapComponent from '../../_commons/MapComponent/MapComponent';
import MapDialog from '../../_commons/MapDialog/MapDialog';
import GroupForm from './Detail/Detail';
import { ThemeContext, toastError, toastSuccess } from '../../Misc/utils';
import GetGroupDto from '../../Services/Group/dto/GetGroupDto';
import PostGroupDto from '../../Services/Group/dto/PostGroupDto';
import { InputText } from 'primereact/inputtext';
import GroupService from '../../Services/Group/GroupService';
import { useDispatch } from 'react-redux';
import { setGroups } from '../../reducers/params/paramsSlice';
import { RootState, useAppSelector } from '../../reducers/store';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';
import GuideService from '../../Services/Guide/GuideService';

interface Props {

}

export interface Params {
  id: string,
  guideName: string,
  place: string
}

const Group: FunctionComponent<Props> = (props) => {

  const [group, setGroup] = useState({} as GetGroupDto);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [createModa, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useContext(ThemeContext).toast;
  const groupService = new GroupService(localStorage.getItem('token'));
  const guideService = new GuideService(localStorage.getItem('token'));
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const groups = useAppSelector((state: RootState) => state.params.groups);
  const activeUser = useAppSelector((state: RootState) => state.params.activeUser);

  const [filterParams, setFilterParams] = useState<Params>({
    id: '',
    guideName: '',
    place: ''
  });

  const getGroups = async () => {
    setIsLoading(true);
    try {
      const groups = await groupService.getGroups(filterParams);
      dispatch(setGroups([...groups]));
    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateGroup = async (values: PostGroupDto) => {
    setIsLoading(true);
    try {
      const payload = Object.assign({}, { ...values, guide: { ...group.guide, idGrupo: groups.length + 1 }, turists: [] });
      const patchGuide = Object.assign({}, { idGrupo: groups.length + 1 });

      await groupService.createGroup(payload);
      await guideService.patchGuide(patchGuide, values.guide.id);

      await getGroups();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Grupo adicionado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleUpdateGroup = async (values: GetGroupDto) => {
    setIsLoading(true);
    try {
      await groupService.updateGroup(values, values.id);
      await getGroups();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Grupo atualizado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleDeleteGroup = async (values: GetGroupDto) => {
    setIsLoading(true);
    try {
      await groupService.deleteGroup(group.id);
      await getGroups();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Grupo excluído com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleKeyPressInput = async (ev: any) => {
    if (ev.key === 'Enter') await getGroups();
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value })
  }

  const handleSearchBtn = async () => {
    setGroup({} as GetGroupDto);
    await getGroups();
  }

  const handleClearBtn = () => {
    setFilterParams({
      id: '',
      guideName: '',
      place: ''
    });
    inputRef?.current?.focus();
  }

  const handleEdit = (group: GetGroupDto) => {
    setGroup({ ...group });
    setCreateMode(false);
    setOpenDetail(true);
  }

  const handleAdd = () => {
    setGroup({} as GetGroupDto);
    setCreateMode(true);
    setOpenDetail(true);
  }

  const handleOpenMap = (group: GetGroupDto) => {
    setOpenMapDialog(true);
  }

  const handleConfirmDelete = (group: GetGroupDto) => {
    setGroup({ ...group });
    setOpenConfirm(true);
  };

  const actionsBodyTemplate = (rowData: GetGroupDto) => {
    return (
      <div className="lg:text-right pr-1">
        {/* <Button
          icon="fa-solid fa-location-dot"
          className='p-button-secondary p-button-xs'
          tooltip="Posição"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleOpenMap(rowData)}
        /> */}
        <Button
          icon="fas fa-pen"
          className='p-button-secondary p-button-xs ml-2'
          tooltip="Detalhes"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="fas fa-trash"
          className="p-button-xs p-button-danger ml-2"
          tooltip="Excluir"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleConfirmDelete(rowData)}
        />
      </div>
    );
  }

  return (
    <div className='board-spacing'>
      <h2 className='title-styles'>Grupo</h2>

      {/* <section>
        <Card title="Posições dos Grupos">
          <MapComponent />
        </Card>
      </section> */}

      <section className='board-section surface-0 mt-5'>
        <div className='p-4'>
          <div className='grid p-0 m-0'>
            <div className='col-12 lg:col-9 p-0 m-0'>
              <div className='grid p-0 m-0'>
                <div className="col-12 lg:col-3">
                  <InputText
                    ref={inputRef}
                    name="id"
                    value={filterParams?.id}
                    placeholder="Id"
                    className="inputfield p-inputtext-sm w-full text-sm"
                    onChange={handleChange}
                    onKeyPress={handleKeyPressInput}
                    autoComplete='off'
                    autoFocus
                  />
                </div>
                <div className="col-12 lg:col-3">
                  <InputText
                    name="guideName"
                    value={filterParams?.guideName}
                    placeholder="Nome do Guia"
                    className="inputfield p-inputtext-sm w-full text-sm"
                    onChange={handleChange}
                    onKeyPress={handleKeyPressInput}
                    autoComplete='off'
                  />
                </div>
                <div className="col-12 lg:col-3">
                  <InputText
                    name="place"
                    value={filterParams?.place}
                    placeholder="Lugar"
                    className="inputfield p-inputtext-sm w-full text-sm"
                    onChange={handleChange}
                    onKeyPress={handleKeyPressInput}
                    autoComplete='off'
                  />
                </div>
                <div className="flex col-12 lg:col-3">
                  <Button
                    label='Pesquisar'
                    className='lg:flex-grow-0 flex-grow-1 p-button-sm p-button-primary'
                    disabled={isLoading}
                    onClick={handleSearchBtn}
                  />
                  <Button
                    label='Limpar'
                    className='lg:flex-grow-0 flex-grow-1 p-button-sm p-button-secondary ml-2'
                    disabled={isLoading || (!filterParams.id && !filterParams.guideName && !filterParams.id)}
                    onClick={handleClearBtn}
                  />
                </div>
              </div>
            </div>
            <div className='flex col-12 lg:col-3 justify-content-end'>
              <Button
                icon="pi pi-refresh"
                className="p-button-sm p-button-secondary"
                onClick={getGroups}
                loading={isLoading}
                tooltip="Atualizar"
                tooltipOptions={{ position: 'top' }}
              />
              <Button
                label='Adicionar Grupo'
                icon="pi pi-plus"
                className='lg:flex-grow-0 flex-grow-1 p-button-sm p-button-primary ml-2'
                onClick={handleAdd}
              />
            </div>
          </div>
        </div>
      </section >

      <div className="datatable-div mt-5">
        <DataTable
          data={groups}
          dataKey='id'
          paginator
          loading={isLoading}
        >
          <Column field="id" header="ID Grupo"></Column>
          <Column field="place" header="Lugar"></Column>
          <Column body={(rowData: GetGroupDto) => rowData.guide.name} header="Nome do Guia"></Column>
          <Column field="imageUrl" header="Url da Imagem"></Column>
          <Column body={actionsBodyTemplate}></Column>
        </DataTable>
      </div>

      {/* <MapDialog
        header="Posição do Grupo"
        openDialog={openMapDialog}
        onClose={() => setOpenMapDialog(false)}
      /> */}

      <GroupForm
        group={group}
        openDetail={openDetail}
        loading={isLoading}
        createMode={createModa}
        onCreate={handleCreateGroup}
        onUpdate={handleUpdateGroup}
        onClose={() => setOpenDetail(false)}
      />

      <ConfirmDialog
        visible={openConfirm}
        header={`Remover Grupo "${group.id}"`}
        message='Deseja realmente remover este Grupo?'
        icon="pi pi-info-circle"
        acceptLabel="Sim"
        rejectLabel="Não"
        accept={() => handleDeleteGroup(group)}
        onHide={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default Group;



