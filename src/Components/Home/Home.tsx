import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Home.scss';
import GroupContent from '../../_commons/GroupContent/GroupContent';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';

import onBoardHome from '../../assets/home-logo.jpg';
import onSerchHome from '../../assets/search.jpg';
import { ThemeContext, toastError, toastSuccess } from '../../Misc/utils';
import Groupservice from '../../Services/Group/GroupService';
import { Params } from '../Group/Group';
import GetGroupDto from '../../Services/Group/dto/GetGroupDto';
import { MAX_GROUP_LENGHT } from '../../Env/env';
import GroupForm from '../Group/Detail/Detail';
import { RootState, useAppSelector } from '../../reducers/store';
import GetTuristDto from '../../Services/Turist/dto/GetTuristDto';
import { useDispatch } from 'react-redux';
import { setGroups } from '../../reducers/params/paramsSlice';
import TuristService from '../../Services/Turist/TuristService';
import GroupService from '../../Services/Group/GroupService';
import GuideService from '../../Services/Guide/GuideService';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [group, setGroup] = useState({} as GetGroupDto);
  const [pneultGroup, setPneultGroup] = useState({} as GetGroupDto);
  const [lastGroup, setLastGroup] = useState({} as GetGroupDto);
  const [images, setImages] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useContext(ThemeContext).toast;
  const dispatch = useDispatch();

  const turists = useAppSelector((state: RootState) => state.params.turists);
  const guides = useAppSelector((state: RootState) => state.params.guides);
  const groups = useAppSelector((state: RootState) => state.params.groups);
  const activeUser = useAppSelector((state: RootState) => state.params.activeUser);

  const groupService = new GroupService(localStorage.getItem('token'));
  const turistService = new TuristService(localStorage.getItem('token'));

  useEffect(() => {
    setImages([...imageData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getGroups();
  }, [activeUser, turists, guides]); // eslint-disable-line react-hooks/exhaustive-deps


  const getGroups = async () => {
    setIsLoading(true);
    try {

      let _groups = await groupService.getGroups({} as Params);
      const userJsonServerTurist = turists.filter(t => t.id === activeUser.id)[0];
      const userJsonServerGuide = guides.filter(t => t.id === activeUser.id)[0];

      if (activeUser.tipo === "T" && userJsonServerTurist?.idGrupo) {
        _groups = _groups.filter(g => g.id === userJsonServerTurist.idGrupo);
      }

      if (activeUser.tipo === "G") {
        userJsonServerGuide?.idGrupo
          ? _groups = _groups.filter(g => g.id === userJsonServerGuide.idGrupo)
          : _groups = [];
      }

      dispatch(setGroups([..._groups]));

      if (_groups.length) {
        setPneultGroup({} as GetGroupDto);
        setLastGroup({} as GetGroupDto);

        if (_groups.length > 1) {
          setPneultGroup({ ..._groups[_groups.length - 2] });
          setLastGroup({ ..._groups[_groups.length - 1] });
        } else {
          setPneultGroup({ ..._groups[0] });
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

  const handleAssoctiation = async (values: GetTuristDto[], groupId: number) => {
    setIsLoading(true);
    try {
      await groupService.patchGroup({ turists: [...values] }, groupId);
      await turistService.patchTurist(Object.assign({}, {
        idGrupo: group.id,
      }), activeUser.id)
      await getGroups();
      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Usuário anexado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
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

    return (_completeLabel && _completeLabel == 'dez')
      ? 'As vagas para o grupo já estão preenchidas'
      :
      (_completeLabel ?
        `Faltam ${_completeLabel} pessoas para completar o grupo`
        : `Seja o primeiro a participar do grupo`);
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
            {pneultGroup.id && <div className='w-12 lg:w-6'>
              <div>
                <img
                  src={require(`../../assets/${pneultGroup?.imageUrl || 'defaultImg.jpg'}`)}
                  alt={`Imagem-Grupo${groups.length === 1 ? groups.length : groups.length - 1}`}
                  width='100%'
                  height='562.41px'
                />
              </div>
              <div className='w-full lg:ml-4 lg:mt-3'>
                <h2 className='title-styles'>{`Grupo ${groups.length === 1 ? groups.length : groups.length - 1} - Viagem: ${pneultGroup.place}`}</h2>
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
            </div>}

            {lastGroup.id && <div className='w-12 lg:w-6 lg:ml-5 mt-3 lg:mt-0'>
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
            }
            {!groups.length ? <h2 className='title-styles text-center my-8'>Não existem grupos ativos no sistema</h2> : null}
          </div>

          {groups.length ? <hr className='hr-spacing'></hr> : null}

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
            {/* <div className='text-right mt-5'>
              <Button
                label='Localizações'
                icon="fa-solid fa-location-dot"
                className='p-button-sm p-button-primary'
              />
            </div> */}
          </div>
        </div>

      </div>

      <GroupForm
        group={group}
        createMode={false}
        isHome
        openDetail={openDetail}
        loading={isLoading}
        onAssociate={handleAssoctiation}
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
