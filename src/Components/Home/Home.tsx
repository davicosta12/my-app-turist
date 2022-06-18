import { FunctionComponent } from 'react';
import onBoardHome from '../../Assets/home-logo.jpg';
import './Home.scss';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {
  return (
    <div className='home-container'>
      {/* <h2 className='title-styles'>Home</h2> */}
      <section className='home-logo-container'>
        <div className='home-logo'>
          <img src={onBoardHome} alt="home-logo">
        </div>
      </section>
    </div>
  );
};

export default Home;