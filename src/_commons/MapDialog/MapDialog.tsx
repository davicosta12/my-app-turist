import { FunctionComponent } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import MapComponent from '../MapComponent/MapComponent';


interface Props {
  header: string;
  openDialog: boolean;
  loading?: boolean;
  onClose: () => void;
}

const MapDialog: FunctionComponent<Props> = props => {

  const {
    header,
    onClose,
    loading,
    openDialog,
  } = props;


  const renderFooter = () => <div className="grid">
    <div className="col-12 flex justify-content-end">
      <Button
        label="Fechar"
        className="lg:flex-grow-0 flex-grow-1 p-button-sm p-button-outlined-gray "
        onClick={onClose}
      />
    </div>
  </div>

  return (
    <>
      <Dialog
        header={header}
        className="w-9"
        visible={openDialog}
        onHide={onClose}
        breakpoints={{ '960px': '75vw' }}
        maximizable
        footer={renderFooter}
      >
        <div>
          <MapComponent />
        </div>
      </Dialog>
    </>
  );
}

export default MapDialog;