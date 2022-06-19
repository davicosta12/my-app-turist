import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Home.scss';
import GroupContent from '../../_commons/GroupContent/GroupContent';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';

import onBoardHome from '../../assets/home-logo.jpg';
import onSerchHome from '../../assets/search.jpg';
import { ThemeContext, toastError } from '../../Misc/utils';
import Groupservice from '../../Services/Group/GroupService';
import { Params } from '../Group/Group';
import GetGroupDto from '../../Services/Group/dto/GetGroupDto';
import { MAX_GROUP_LENGHT } from '../../Env/env';
import GroupForm from '../Group/Detail/Detail';
import GetGuideDto from '../../Services/Guide/dto/GetGuideDto';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';
import GuideService from '../../Services/Guide/GuideService';
import TuristService from '../../Services/Turist/TuristService';
import { Params as ParamsGuide } from '../Guide/Guide';
import { Params as ParamsTurist } from '../Turist/Turist';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [groups, setGroups] = useState<GetGroupDto[]>([]);
  const [group, setGroup] = useState({} as GetGroupDto);
  const [guides, setGuides] = useState<GetGuideDto[]>([]);
  const [turists, setTurists] = useState<GetTuristDto[]>([]);
  const [pneultGroup, setPneultGroup] = useState({} as GetGroupDto);
  const [lastGroup, setLastGroup] = useState({} as GetGroupDto);
  const [images, setImages] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useContext(ThemeContext).toast;
  const groupService = new Groupservice(localStorage.getItem('token'));
  const guideService = new GuideService(localStorage.getItem('token'));
  const turistService = new TuristService(localStorage.getItem('token'));

  useEffect(() => {
    setImages([...imageData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getGroups();
    getGuides();
    getTurists();
  }, []);

  const getGroups = async () => {
    setIsLoading(true);
    try {
      const groups = await groupService.getGroups({} as Params);
      setGroups([...groups]);
      setPneultGroup({ ...groups[groups.length - 2] });
      setLastGroup({ ...groups[groups.length - 1] });
    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const getGuides = async () => {
    setIsLoading(true);
    try {
      const guides = await guideService.getGuides({} as ParamsGuide);
      setGuides([...guides]);
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
      const turists = await turistService.getTurists({} as ParamsTurist);
      setTurists([...turists]);
    }
    catch (err: any) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleAssoctiation = async () => {

  }

  const handleOpenDetail = (group: GetGroupDto) => {
    setGroup({ ...group });
    setOpenDetail(true);
  }

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

  const getGroupNumberComplete = (turistLength: number) => {

    if (turistLength) {

      return turistLength >= MAX_GROUP_LENGHT
        ? MAX_GROUP_LENGHT
        : turistLength;

    }

    return 0;
  }

  const getGroupLabelComplete = (turistLength: number) => {

    let _completeLabel = '';

    if (turistLength) {

      switch (turistLength) {
        case 1: _completeLabel = 'nove'; break;
        case 2: _completeLabel = 'oito'; break;
        case 3: _completeLabel = 'sete'; break;
        case 4: _completeLabel = 'seis'; break;
        case 5: _completeLabel = 'cinco'; break;
        case 6: _completeLabel = 'quatro'; break;
        case 7: _completeLabel = 'três'; break;
        case 8: _completeLabel = 'dois'; break;
        case 9: _completeLabel = 'um'; break;
        case 10: _completeLabel = 'dez'; break;
        default: break;
      }
    }

    return _completeLabel
      ? `Faltam ${_completeLabel} pessoas para completar o grupo`
      : `Seja o primeiro a participar do grupo`;
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

          {groups.slice(0, groups.length - 2).map((item: GetGroupDto, i: number) => <>
            <GroupContent
              group={item}
              country={item.place}
              guideName={item.guide.name}
              groupInformation={`${getGroupNumberComplete(item.turists?.length)}/10 (${getGroupLabelComplete(item.turists?.length)})`}
              groupNumber={i + 1}
              imageUrl={item.imageUrl}
              alt={`Imagem-Grupo${i + 1}`}
              onOpenDetail={handleOpenDetail}
            />

            <hr className='hr-spacing'></hr>
          </>)}

          <div className='w-auto lg:flex justify-content-between'>
            <div className='w-12 lg:w-6'>
              <div>
                <img
                  src={require(`../../assets/${pneultGroup?.imageUrl || 'defaultImg.jpg'}`)}
                  alt={`Imagem-Grupo${groups.length - 1}`}
                  width='100%'
                  height='562.41px'
                />
              </div>
              <div className='w-full lg:ml-4 lg:mt-3'>
                <h2 className='title-styles'>{`Grupo ${groups.length - 1} - Viagem: ${pneultGroup.place}`}</h2>
                <p className='paragraph-styles'>{`Guia: ${pneultGroup.guide?.name}`}</p>
                <p className='paragraph-styles'>{`Grupo: ${getGroupNumberComplete(pneultGroup.turists?.length)}/10 (${getGroupLabelComplete(pneultGroup.turists?.length)})`}</p>
              </div>
              <div className='text-right mt-5'>
                <Button
                  label='Detalhes'
                  icon="pi pi-eye"
                  className='p-button-sm p-button-primary'
                  onClick={() => handleOpenDetail(pneultGroup)}
                />
              </div>
            </div>
            <div className='w-12 lg:w-6 lg:ml-5 mt-3 lg:mt-0'>
              <div>
                <img
                  src={require(`../../assets/${lastGroup?.imageUrl || 'defaultImg.jpg'}`)}
                  alt={`Imagem-Grupo${groups.length}`}
                  width='100%'
                  height='562.41px'
                />
              </div>
              <div className='w-full lg:ml-4 lg:mt-3'>
                <h2 className='title-styles'>{`Grupo ${groups.length} - Viagem: ${lastGroup.place}`}</h2>
                <p className='paragraph-styles'>{`Guia: ${lastGroup.guide?.name}`}</p>
                <p className='paragraph-styles'>{`Grupo: ${getGroupNumberComplete(lastGroup.turists?.length)}/10 (${getGroupLabelComplete(lastGroup.turists?.length)})`}</p>
              </div>
              <div className='text-right mt-5'>
                <Button
                  label='Detalhes'
                  icon="pi pi-eye"
                  className='p-button-sm p-button-primary'
                  onClick={() => handleOpenDetail(lastGroup)}
                />
              </div>
            </div>
          </div>

          <hr className='hr-spacing'></hr>

          <div>
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
            <div className='text-right mt-5'>
              <Button
                label='Localizações'
                icon="fa-solid fa-location-dot"
                className='p-button-sm p-button-primary'
              />
            </div>
          </div>
        </div>

      </div>

      <GroupForm
        group={group}
        guides={guides}
        turists={turists}
        isHome
        openDetail={openDetail}
        loading={isLoading}
        onCreate={handleAssoctiation}
        onUpdate={handleAssoctiation}
        onClose={() => setOpenDetail(false)}
      />

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
