import { Card } from 'primereact/card';
import React from 'react';
import { RootState, useAppSelector } from '../../reducers/store';
import MapComponent from '../../_commons/MapComponent/MapComponent';

interface Props {
}

const Locations: React.FunctionComponent<Props> = (props) => {

  const guides = useAppSelector((state: RootState) => state.params.guides);

  return (
    <div className='board-spacing'>

      <h2 className='title-styles'>Localizações</h2>

      <section>
        <Card title="Posições Gerais">
          <MapComponent />
        </Card>
      </section>

      <div className='w-full lg:ml-4 lg:mt-3'>
        <h2 className='title-styles'>{`Guia: dawd`}</h2>
        <p className='paragraph-styles'>{`Guia: wada`}</p>
        <p className='paragraph-styles'>{`Grupo: dwad`}</p>
      </div>
    </div>
  );
};

export default Locations;
