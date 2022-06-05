import { FunctionComponent, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import DataTable from '../../_commons/Datatable/Datatable';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import MapComponent from '../../_commons/MapComponent/MapComponent';
import MapDialog from '../../_commons/MapDialog/MapDialog';
import GroupForm from './Detail/Detail';

interface Props {
}

export interface GetGroupDto {
  id: number;
  name: string;
  description: string;
  email: string;
  document: string;
}

const Group: FunctionComponent<Props> = (props) => {

  const [groups, setGroups] = useState<GetGroupDto[]>([]);
  const [group, setGroup] = useState({} as GetGroupDto);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [createModa, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getGroups = () => {

  }

  const handleCreateGroup = (group: GetGroupDto) => {

  }

  const handleUpdateGroup = (group: GetGroupDto) => {

  }

  const handleDeleteGroup = (group: GetGroupDto) => {

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
        <Button
          icon="fa-solid fa-location-dot"
          className='p-button-secondary p-button-xs'
          tooltip="Posição"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleOpenMap(rowData)}
        />
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
      <h2 className='title-styles'>Grupo</h2>

      <section>
        <Card title="Posições dos Grupos">
          <MapComponent />
        </Card>
      </section>

      <section className='board-section surface-0 mt-5'>
        <div className='flex justify-content-end p-4'>
          <Button
            label='Adicionar Grupo'
            icon="pi pi-plus"
            className='p-button-sm p-button-primary'
            onClick={handleAdd}
          />
        </div>
      </section>

      <div className="datatable-div mt-5">
        <DataTable
          data={groupsFake}
          dataKey='id'
          paginator
        >
          <Column field="name" header="Nome" filter filterField="name" filterPlaceholder="Pesquise pelo nome"></Column>
          <Column field="description" header="Descrição"></Column>
          <Column field="email" header="Email"></Column>
          <Column body={actionsBodyTemplate}></Column>
        </DataTable>
      </div>

      <MapDialog
        header="Posição do Grupo"
        openDialog={openMapDialog}
        onClose={() => setOpenMapDialog(false)}
      />

      <GroupForm
        group={group}
        openDetail={openDetail}
        createMode={createModa}
        onCreate={handleCreateGroup}
        onUpdate={handleUpdateGroup}
        onClose={() => setOpenDetail(false)}
      />

      <ConfirmDialog
        visible={openConfirm}
        header={`Remover Grupo "${group.name}"`}
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

const groupsFake = new Array(30).fill(0)
  .map((g, i) => Object.assign({}, {
    id: i + 1,
    name: `Grupo ${i + 1}`,
    description: 'informação qualquer',
    email: `grupo${i + 1}@hotmail.com`,
    document: '51189115832'
  }));

