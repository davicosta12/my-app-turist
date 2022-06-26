import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import DataTable from '../../_commons/Datatable/Datatable';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import MapComponent from '../../_commons/MapComponent/MapComponent';
import MapDialog from '../../_commons/MapDialog/MapDialog';
import GuideForm from './Detail/Detail';
import { ThemeContext, toastError, toastSuccess } from '../../Misc/utils';
import GuideService from '../../Services/Guide/GuideService';
import GetGuideDto from '../../Services/Guide/dto/GetGuideDto';
import { InputText } from 'primereact/inputtext';
import { useDispatch } from 'react-redux';
import { setGuides } from '../../reducers/params/paramsSlice';
import { RootState, useAppSelector } from '../../reducers/store';
import UserService from '../../Services/User/UserService';
import { Dropdown } from 'primereact/dropdown';


interface Props {
}

export interface Params {
  id: string,
  name: string,
  genrer: string
}

const Guide: FunctionComponent<Props> = (props) => {

  const [guide, setGuide] = useState({} as GetGuideDto);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [createModa, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useContext(ThemeContext).toast;
  const guideService = new GuideService(localStorage.getItem('token'));
  const userService = new UserService(localStorage.getItem('token'));
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const guides = useAppSelector((state: RootState) => state.params.guides);

  const [filterParams, setFilterParams] = useState<Params>({
    id: '',
    name: '',
    genrer: ''
  });

  const getGuides = async () => {
    setIsLoading(true);
    try {
      const users = await guideService.getGuides(filterParams);
      const guides = users.filter(user => user.tipo === "G" && !user.isAdmin);
      dispatch(setGuides([...guides]));
    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateGuide = async (values: GetGuideDto) => {
    setIsLoading(true);
    try {
      const payload = Object.assign({}, { ...values, tipo: "G", isAdmin: false });
      const res = await userService.createUser(payload);
      if (!res.access_token) {
        throw new Error("Erro no cadastro do Guia");
      }
      await guideService.createGuide(payload);
      await getGuides();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Guia adicionado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleUpdateGuide = async (values: GetGuideDto) => {
    setIsLoading(true);
    try {
      await guideService.updateGuide(values, values.id);
      await getGuides();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Guia atualizado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleDeleteGuide = async (guide: GetGuideDto) => {
    setIsLoading(true);
    try {
      await guideService.deleteGuide(guide.id);
      await getGuides();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Guia excluído com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSearchBtn = async () => {
    setGuide({} as GetGuideDto);
    await getGuides();
  }

  const handleClearBtn = () => {
    setFilterParams({
      id: '',
      name: '',
      genrer: ''
    });
    inputRef?.current?.focus();
  }

  const handleEdit = (guide: GetGuideDto) => {
    setGuide({ ...guide });
    setCreateMode(false);
    setOpenDetail(true);
  }

  const handleAdd = () => {
    setGuide({} as GetGuideDto);
    setCreateMode(true);
    setOpenDetail(true);
  }

  const handleOpenMap = (guide: GetGuideDto) => {
    setOpenMapDialog(true);
  }

  const handleConfirmDelete = (guide: GetGuideDto) => {
    setGuide({ ...guide });
    setOpenConfirm(true);
  };

  const handleKeyPressInput = async (ev: any) => {
    if (ev.key === 'Enter') await getGuides();
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value })
  }

  const actionsBodyTemplate = (rowData: GetGuideDto) => {
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
          className='p-button-outlined-gray p-button-xs ml-2'
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
      <h2 className='title-styles'>Guia</h2>

      {/* <section>
        <Card title="Posições dos Guias">
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
                    name="name"
                    value={filterParams?.name}
                    placeholder="Nome"
                    className="inputfield p-inputtext-sm w-full text-sm"
                    onChange={handleChange}
                    onKeyPress={handleKeyPressInput}
                    autoComplete='off'
                  />
                </div>
                <div className="col-12 lg:col-3">
                  <Dropdown
                    name="genrer"
                    className="inputfield p-inputtext-sm w-full"
                    placeholder='Gênero'
                    value={filterParams.genrer}
                    options={[{ label: 'Masculino', value: 'Masculino' }, { label: 'Feminino', value: 'Feminino' }]}
                    onChange={handleChange}
                    showClear
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
                    disabled={isLoading || (!filterParams.id && !filterParams.name && !filterParams.genrer)}
                    onClick={handleClearBtn}
                  />
                </div>
              </div>
            </div>
            <div className='flex col-12 lg:col-3 justify-content-end'>
              <Button
                icon="pi pi-refresh"
                className="p-button-sm p-button-secondary"
                onClick={getGuides}
                loading={isLoading}
                tooltip="Atualizar"
                tooltipOptions={{ position: 'top' }}
              />
              <Button
                label='Adicionar Guia'
                icon="pi pi-plus"
                className='lg:flex-grow-0 flex-grow-1 p-button-sm p-button-primary ml-2'
                onClick={handleAdd}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="datatable-div mt-5">
        <DataTable
          data={guides}
          dataKey='id'
          loading={isLoading}
          paginator
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nome"></Column>
          <Column field="genrer" header="Gênero"></Column>
          <Column field="document" header="CPF"></Column>
          <Column field="cellphone" header="Celular"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="email" header="Email"></Column>
          <Column body={actionsBodyTemplate}></Column>
        </DataTable>
      </div>

      <MapDialog
        header="Posição do Guia"
        openDialog={openMapDialog}
        onClose={() => setOpenMapDialog(false)}
      />

      <GuideForm
        guide={guide}
        openDetail={openDetail}
        createMode={createModa}
        loading={isLoading}
        onCreate={handleCreateGuide}
        onUpdate={handleUpdateGuide}
        onClose={() => setOpenDetail(false)}
      />

      <ConfirmDialog
        visible={openConfirm}
        header={`Remover Guia "${guide.name}"`}
        message='Deseja realmente remover este Guia?'
        icon="pi pi-info-circle"
        acceptLabel="Sim"
        rejectLabel="Não"
        accept={() => handleDeleteGuide(guide)}
        onHide={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default Guide;

