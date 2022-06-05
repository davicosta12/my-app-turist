import { FunctionComponent, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import DataTable from '../../_commons/Datatable/Datatable';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import MapComponent from '../../_commons/MapComponent/MapComponent';
import MapDialog from '../../_commons/MapDialog/MapDialog';
import GuideForm from './Detail/Detail';


interface Props {
}

export interface GetGuideDto {
  id: number;
  name: string;
  description: string;
  email: string;
  document: string;
}

const Guide: FunctionComponent<Props> = (props) => {

  const [guides, setGuides] = useState<GetGuideDto[]>([]);
  const [guide, setGuide] = useState({} as GetGuideDto);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [createModa, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getGuides = () => {

  }

  const handleCreateGuide = (guide: GetGuideDto) => {

  }

  const handleUpdateGuide = (guide: GetGuideDto) => {

  }

  const handleDeleteGuide = (guide: GetGuideDto) => {

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

  const actionsBodyTemplate = (rowData: GetGuideDto) => {
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
      <h2 className='title-styles'>Guia</h2>

      <section>
        <Card title="Posições dos Guias">
          <MapComponent />
        </Card>
      </section>

      <section className='board-section surface-0 mt-5'>
        <div className='flex justify-content-end p-4'>
          <Button
            label='Adicionar Guia'
            icon="pi pi-plus"
            className='p-button-sm p-button-primary'
            onClick={handleAdd}
          />
        </div>
      </section>

      <div className="datatable-div mt-5">
        <DataTable
          data={guidesFake}
          dataKey='id'
          paginator
        >
          <Column field="name" header="Nome"></Column>
          <Column field="description" header="Descrição"></Column>
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

const guidesFake = new Array(30).fill(0)
  .map((g, i) => Object.assign({}, {
    id: i + 1,
    name: `Guia ${i + 1}`,
    description: 'informação qualquer',
    email: `guia${i + 1}@hotmail.com`,
    document: '51189115832'
  }));
