import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import DataTable from '../../_commons/Datatable/Datatable';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import MapComponent from '../../_commons/MapComponent/MapComponent';
import MapDialog from '../../_commons/MapDialog/MapDialog';
import TuristForm from './Detail/Detail';
import TuristService from '../../Services/Turist/TuristService';
import { ThemeContext, toastError, toastSuccess } from '../../Misc/utils';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';
import PostTuristDto from '../../Services/Turist/dto/PostTuristDto';
import PutTuristDto from '../../Services/Turist/dto/PutTuristDto';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../reducers/store';
import { setTurists } from '../../reducers/params/paramsSlice';
import UserService from '../../Services/User/UserService';

interface Props {
}

export interface Params {
  id: string,
  name: string,
  genrer: string
}

const Turist: FunctionComponent<Props> = (props) => {

  const [turist, setTurist] = useState({} as GetTuristDto);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [createModa, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useContext(ThemeContext).toast;
  const turistService = new TuristService(localStorage.getItem('token'));
  const userService = new UserService(localStorage.getItem('token'));
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const turists = useAppSelector((state: RootState) => state.params.turists);

  const [filterParams, setFilterParams] = useState<Params>({
    id: '',
    name: '',
    genrer: ''
  });

  const getTurists = async () => {
    setIsLoading(true);
    try {
      const users = await turistService.getTurists(filterParams);
      const turists = users.filter(user => user.tipo === "T" && !user.isAdmin);
      dispatch(setTurists([...turists]));
    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateTurist = async (values: PostTuristDto) => {
    setIsLoading(true);
    try {
      const payload = Object.assign({}, { ...values, tipo: "T", isAdmin: false, isActive: true });
      const res = await userService.createUser(payload);
      if (!res.access_token) {
        throw new Error("Erro no cadastro do Turista");
      }
      await turistService.createTurist(payload);
      await getTurists();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Turista adicionado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleUpdateTurist = async (values: PutTuristDto) => {
    setIsLoading(true);
    try {
      await turistService.updateTurist(values, values.id);
      await getTurists();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Turista atualizado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleDeleteTurist = async (turist: GetTuristDto) => {
    setIsLoading(true);
    try {
      await turistService.patchTurist({ isActive: false }, turist.id);
      await getTurists();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Turista excluído com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSearchBtn = async () => {
    setTurist({} as GetTuristDto);
    await getTurists();
  }

  const handleClearBtn = () => {
    setFilterParams({
      id: '',
      name: '',
      genrer: ''
    });
    inputRef?.current?.focus();
  }

  const handleEdit = (turist: GetTuristDto) => {
    setTurist({ ...turist });
    setCreateMode(false);
    setOpenDetail(true);
  }

  const handleAdd = () => {
    setTurist({} as GetTuristDto);
    setCreateMode(true);
    setOpenDetail(true);
  }

  const handleOpenMap = (turist: GetTuristDto) => {
    setOpenMapDialog(true);
  }

  const handleConfirmDelete = (turist: GetTuristDto) => {
    setTurist({ ...turist });
    setOpenConfirm(true);
  }

  const handleKeyPressInput = async (ev: any) => {
    if (ev.key === 'Enter') await getTurists();
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value })
  }

  const actionsBodyTemplate = (rowData: GetTuristDto) => {
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

      <h2 className='title-styles'>Turista</h2>

      {/* <section>
        <Card title="Posições dos Turistas">
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
                onClick={getTurists}
                loading={isLoading}
                tooltip="Atualizar"
                tooltipOptions={{ position: 'top' }}
              />
              <Button
                label='Adicionar Turista'
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
          dataKey='id'
          data={turists.filter(g => g.isActive)}
          loading={isLoading}
          paginator
        >
          <Column field="id" header="Id"></Column>
          <Column field="name" header="Nome"></Column>
          <Column field="genrer" header="Gênero"></Column>
          <Column field="cellphone" header="Celular"></Column>
          <Column header="Data de Nascimento" body={(rowData: GetTuristDto) => moment(rowData.birthDate).format('DD/MM/YYYY')}></Column>
          <Column body={actionsBodyTemplate}></Column>
        </DataTable>
      </div>

      {/* <MapDialog
        header="Posição do Turista"
        openDialog={openMapDialog}
        onClose={() => setOpenMapDialog(false)}
      /> */}

      <TuristForm
        turist={turist}
        openDetail={openDetail}
        createMode={createModa}
        loading={isLoading}
        onCreate={handleCreateTurist}
        onUpdate={handleUpdateTurist}
        onClose={() => setOpenDetail(false)}
      />

      <ConfirmDialog
        visible={openConfirm}
        header={`Remover Turista "${turist.name}"`}
        message='Deseja realmente remover este Turista?'
        icon="pi pi-info-circle"
        acceptLabel="Sim"
        rejectLabel="Não"
        accept={() => handleDeleteTurist(turist)}
        onHide={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default Turist;

