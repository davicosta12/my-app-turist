import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import './ContentWrapper.scss';

interface Props {
}

const ContentWrapper: React.FunctionComponent<Props> = (props) => {

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const itemsSidebar = [
    {
      items: [
        { label: 'Home', icon: 'fa-solid fa-house', command: () => { navigate("/home"); setVisible(false); } },
        { label: 'Guia', icon: 'fa-solid fa-compass', command: () => { navigate("/guide"); setVisible(false); } },
        { label: 'Turista', icon: 'fa-solid fa-suitcase-rolling', command: () => { navigate("/turist"); setVisible(false); } },
        { label: 'Grupo', icon: 'fa-solid fa-people-group', command: () => { navigate("/group"); setVisible(false); } }
      ]
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className='contentWrapper-container'>
      <Sidebar className='sidebar-contentWrapper' visible={visible} onHide={() => setVisible(false)}>
        <h3>Navegação</h3>
        <Menu model={itemsSidebar} />
      </Sidebar>
      <Menubar
        className='menubar-contentWrapper'
        start={<Button icon="pi pi-align-justify" className='button-start p-button-sm p-button-secondary mr-2' onClick={() => setVisible(true)} />}
        end={<Button label="Sair" icon="pi pi-power-off" className='p-button-sm p-button-secondary' onClick={handleLogout} />}
      />
    </div>
  );
};

export default ContentWrapper;