import { Button } from 'primereact/button';
import { FunctionComponent } from 'react';
import GetGroupDto from '../../Services/Group/dto/GetGroupDto';

interface Props {
  group: GetGroupDto,
  country: string,
  guideName: string,
  groupInformation: string,
  groupNumber: number,
  imageUrl: string,
  alt: string
  isOnePerComponent?: boolean;
  onOpenDetail: (group: GetGroupDto) => void;
}

const GroupContent: FunctionComponent<Props> = (props) => {

  const handleOpenDetail = () => {
    props.onOpenDetail(props.group);
  }

  return (
    <div>
      <div className='lg:flex'>
        <div>
          <img
            src={require(`../../assets/${props.imageUrl || 'defaultImg.jpg'}`)}
            alt={props.alt}
            width='200px'
          />
        </div>
        <div className='w-full lg:ml-4 lg:mt-3'>
          <h2 className='title-styles'>{`Grupo ${props.groupNumber} - Viagem:  ${props.country}`}</h2>
          <p className='paragraph-styles'>{`Guia: ${props.guideName}`}</p>
          <p className='paragraph-styles'>{`Grupo: ${props.groupInformation}`}</p>
        </div>
      </div>
      <div className='text-right mt-5'>
        <Button
          label='Detalhes'
          icon="pi pi-eye"
          className='p-button-sm p-button-primary'
          onClick={handleOpenDetail}
        />
      </div>
    </div>
  );
};

export default GroupContent;

GroupContent.defaultProps = {
  isOnePerComponent: false
}


