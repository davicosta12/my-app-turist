import moment from 'moment';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext, toastError } from '../../Misc/utils';
import { setTurists } from '../../reducers/params/paramsSlice';
import { RootState, useAppSelector } from '../../reducers/store';
import GroupService from '../../Services/Group/GroupService';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';
import TuristService from '../../Services/Turist/TuristService';
import MapComponent from '../../_commons/MapComponent/MapComponent';
import MapDialog from '../../_commons/MapDialog/MapDialog';
import { Params } from '../Turist/Turist';
import { Params as ParamsGroup } from '../Group/Group';
import GetGuideDto from '../../Services/Guide/dto/GetGuideDto';
import DataTable from '../../_commons/Datatable/Datatable';
import LocationService from '../../Services/Location/LocationService';
import GetLocationDto from '../../Services/Location/dto/GetLocationDto';
import MapGeral from '../../_commons/MapGeral/MapGeral';

interface Props {
}

const Locations: React.FunctionComponent<Props> = (props) => {

  const [locations, setLocations] = useState<GetLocationDto[]>([]);
  const [location, setLocation] = useState({} as GetLocationDto);
  const [specificPosition, setSpecificPosition] = useState<any>([]);
  const [historicSpecific, setHistoricSpefic] = useState({} as GetLocationDto);
  const [guide, setGuide] = useState({} as GetGuideDto);
  const [place, setPlace] = useState('');
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useContext(ThemeContext).toast;
  const dispatch = useDispatch();

  const activeUser = useAppSelector((state: RootState) => state.params.activeUser);
  const turists = useAppSelector((state: RootState) => state.params.turists);

  const groupService = new GroupService(localStorage.getItem('token'));
  const turistService = new TuristService(localStorage.getItem('token'));
  const locationService = new LocationService(localStorage.getItem('token'));

  useEffect(() => {
    getLocations();
  }, [activeUser]);

  useEffect(() => {
    getTurists();
  }, [locations]);

  const getLocations = async () => {
    setIsLoading(true);
    try {
      const locations = await locationService.getLocations();
      setLocations([...locations]);
    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const getTurists = async () => {
    setIsLoading(true);
    try {
      const users = await turistService.getTurists({} as Params);
      const _groups = await groupService.getGroups({} as ParamsGroup);

      if (activeUser.tipo === "G") {
        const _guides = users.filter(user => user.tipo === "G" && !user.isAdmin)
        const guide = _guides.filter(g => g.id === activeUser.id)[0];

        if (guide && guide?.idGrupo) {

          const group = _groups.filter(g => g.id === guide.idGrupo)[0];
          const location = locations.filter(l => l.idGrupo === group.id)[0];

          if (location?.posicoes?.length) {
            setSpecificPosition([...location.posicoes[0]]);
            location.posicoes = location?.posicoes.slice(0, group.turists.length + 1)
          }
          if (location?.historics?.length) location.historics = location?.historics.slice(0, group.turists.length + 1)


          setLocation({ ...location });
          dispatch(setTurists([...group.turists]));
        }
      }

      if (activeUser.tipo === "T") {
        const _turists = users.filter(user => user.tipo === "T" && !user.isAdmin)
        const turist = _turists.filter(g => g.id === activeUser.id)[0];

        if (turist && turist?.idGrupo) {
          const group = _groups.filter(g => g.id === turist.idGrupo)[0];
          const location = locations.filter(l => l.idGrupo === group.id)[0];

          if (location?.posicoes?.length) {
            setSpecificPosition([...location.posicoes[0]]);
            location.posicoes = location?.posicoes.slice(0, group.turists.length + 1)
          }
          if (location?.historics?.length) location.historics = location?.historics.slice(0, group.turists.length + 1)

          const place = group.place;

          setLocation({ ...location });
          setPlace(place);
          setGuide({ ...group.guide });
        }
      }

    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleOpenMap = (turist: GetTuristDto, options: any) => {
    const _historicSpecific = location.historics[options.rowIndex];
    setHistoricSpefic(_historicSpecific);
    setOpenMapDialog(true);
  }

  const actionsBodyTemplate = (rowData: GetTuristDto, options: any) => {
    return (
      <div className="lg:text-right pr-1">
        <Button
          icon="fa-solid fa-location-dot"
          className='p-button-secondary p-button-xs'
          tooltip="Posição"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleOpenMap(rowData, options)}
        />
      </div>
    );
  }

  return (
    <div className='board-spacing'>

      <h2 className='title-styles'>Localizações</h2>

      <section>
        <Card title="Posições Gerais">
          {location.posicoes?.length && <MapGeral
            location={location}
            specificPosition={specificPosition}
          />}
        </Card>
      </section>


      {activeUser.tipo === "G" && !activeUser.isAdmin
        ?
        <div className="datatable-div mt-5">
          <DataTable
            dataKey='id'
            data={turists}
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

          <MapDialog
            header="Posição do Turista"
            historicSpecific={historicSpecific}
            location={location}
            openDialog={openMapDialog}
            onClose={() => setOpenMapDialog(false)}
          />
        </div>
        :
        <div className='w-full mt-5 lg:ml-4 lg:mt-3'>
          <h2 className='title-styles'>{`Guia: ${guide.name}`}</h2>
          <p className='paragraph-styles'>{`Email: ${guide.email}`}</p>
          <p className='paragraph-styles'>{`Celular: ${guide.cellphone}`}</p>
          <p className='paragraph-styles'>{`Lugar: ${place}`}</p>
        </div>}
    </div>
  );
};

export default Locations;
