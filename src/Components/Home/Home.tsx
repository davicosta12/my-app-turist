import { FunctionComponent, useEffect, useState } from 'react';
import './Home.scss';
import GroupContent from '../../_commons/GroupContent/GroupContent';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';

import onBoardHome from '../../assets/home-logo.jpg';
import onSerchHome from '../../assets/search.jpg';
import onGroup5 from '../../assets/group-5.jpg';
import onGroup6 from '../../assets/group-6.jpg';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [images, setImages] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setImages([...imageData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const itemTemplate = (item: any) => {
    return <img src={require(`../../assets/${item.itemImageSrc}`)} alt={item.alt} style={{ width: '100%', height: '322.16px', display: 'block' }} />
  }

  const thumbnailTemplate = (item: any) => {
    return <img src={require(`../../assets/${item.thumbnailImageSrc}`)} alt={item.alt} style={{ width: '80px', height: '60px', display: 'block' }
    } />
  }

  return (

    <div className='home-container'>
      {/* <h2 className='title-styles'>Home</h2> */}
      <section className='home-logo-container'>
        <div className='home-paragrap'>
          <p>Trabalho IHC - Turistas</p>
        </div>
        <div className='home-title'>
          <h1>Safe Tour</h1>
        </div>
        <div className='home-logo'>
          <img src={onBoardHome} alt="home-logo" />
        </div>
      </section>

      <div className='my-5'>
        <div className='w-auto margin-container'>

          <div className='w-auto lg:flex'>
            <div className='w-12 lg:w-4'>
              <img
                src={onSerchHome}
                alt="Imagem-Mundo"
                width='100%'
                height='350.24px'
              />
            </div>
            <div className='w-12 lg:w-8 lg:ml-4 lg:mt-6'>
              <h2 className='title-styles'>Faça o acompanhamento de suas viagens:</h2>
              <p className='paragraph-styles'>Já pensou os lugares que gostaria de visitar? Não quer se perder durante o passeio? Faça um acompanhamento em tempo real, de onde está o seu guia e outros turistas que fazem parte do seu grupo!</p>
            </div>
          </div>


          <hr className='hr-spacing'></hr>

          <GroupContent
            country='Roma (Itália)'
            guideName='André Ferreira'
            groupInformation='8/10 (Faltam duas pessoas para completar o grupo)'
            groupNumber={1}
            imageUrl='group-1.jpg'
            alt='Imagem-Grupo1'
          />

          <hr className='hr-spacing'></hr>

          <GroupContent
            country='Jericoacoara (Fortaleza)'
            guideName='Lucas Silva '
            groupInformation='6/10 (Faltam quatro pessoas para completar o grupo)'
            groupNumber={2}
            imageUrl='group-2.jpg'
            alt='Imagem-Grupo2'
          />

          <hr className='hr-spacing'></hr>

          <GroupContent
            country='Viagem: Los Angeles (California)'
            guideName='Rebeca Lima'
            groupInformation='5/10 (Faltam cinco pessoas para completar o grupo)'
            groupNumber={3}
            imageUrl='group-3.jpg'
            alt='Imagem-Grupo3'
          />

          <hr className='hr-spacing'></hr>

          <GroupContent
            country='Bora Bora (Polinésia Francesa)'
            guideName='Manuella Souza '
            groupInformation='9/10 (Faltam uma pessoa para completar o grupo)'
            groupNumber={4}
            imageUrl='group-4.jpg'
            alt='Imagem-Grupo4'
          />

          <hr className='hr-spacing'></hr>

          <div className='w-auto lg:flex justify-content-between'>
            <div className='w-12 lg:w-6'>
              <div>
                <img
                  src={onGroup5}
                  alt='Imagem-Grupo5'
                  width='100%'
                  height='562.41px'
                />
              </div>
              <div className='w-full lg:ml-4 lg:mt-3'>
                <h2 className='title-styles'>{`Grupo 5 - Viagem: Maui(Havaí)`}</h2>
                <p className='paragraph-styles'>{`Guia: Roberto Gomes `}</p>
                <p className='paragraph-styles'>{`Grupo: 4/10 (Faltam seis pessoas para completar o grupo)`}</p>
              </div>
              <div className='text-right mt-5'>
                <Button
                  label='Detalhes'
                  icon="pi pi-eye"
                  className='p-button-sm p-button-primary'
                />
              </div>
            </div>
            <div className='w-12 lg:w-6 lg:ml-5 mt-3 lg:mt-0'>
              <div>
                <img
                  src={onGroup6}
                  alt='Imagem-Grupo6'
                  width='100%'
                  height='562.41px'
                />
              </div>
              <div className='w-full lg:ml-4 lg:mt-3'>
                <h2 className='title-styles'>{`Grupo  6 - Barcelona (Espanha)`}</h2>
                <p className='paragraph-styles'>{`Guia: Isabella Nunes`}</p>
                <p className='paragraph-styles'>{`Grupo: 7/10 (Faltam três pessoas para completar o grupo)`}</p>
              </div>
              <div className='text-right mt-5'>
                <Button
                  label='Detalhes'
                  icon="pi pi-eye"
                  className='p-button-sm p-button-primary'
                />
              </div>
            </div>
          </div>

          <hr className='hr-spacing'></hr>

          <div className='w-auto lg:flex'>
            <div className='w-12 lg:w-5'>
              <Galleria
                value={images}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                responsiveOptions={responsiveOptions}
                numVisible={2}
                circular
                autoPlay
                transitionInterval={5000}
                style={{ maxWidth: '800px' }}
                item={itemTemplate}
                thumbnail={thumbnailTemplate} />
            </div>
            <div className='w-12 lg:w-7 lg:ml-4 lg:mt-6'>
              <h2 className='title-styles'>Confira as viagens mais procuradas pelo mundo:</h2>
              <p className='paragraph-styles'>Estas viagens já estão com grupos fechados, porém fiquem espertos para não perderem esta oportunidade em sua próxima viagem!</p>
            </div>
          </div>

        </div>
      </div>
    </div >

  );
};

export default Home;


const imageData = [
  { "itemImageSrc": "bestGroup1.jpg", "thumbnailImageSrc": "bestGroup1.jpg", "alt": "Best Group 1 Image", "title": "Best Group 1" },
  { "itemImageSrc": "bestGroup2.jpg", "thumbnailImageSrc": "bestGroup2.jpg", "alt": "Best Group 2 Image", "title": "Best Group 2" },
  { "itemImageSrc": "bestGroup3.jpg", "thumbnailImageSrc": "bestGroup3.jpg", "alt": "Best Group 3 Image", "title": "Best Group 3" },
  { "itemImageSrc": "bestGroup4.jpg", "thumbnailImageSrc": "bestGroup4.jpg", "alt": "Best Group 4 Image", "title": "Best Group 4" },
];
