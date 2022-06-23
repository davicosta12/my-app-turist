import { createBrazilianCalendar, IContextProps, ThemeContext } from './Misc/utils';
import { Toast } from 'primereact/toast';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import moment from 'moment';
import 'moment/locale/pt-br';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import "leaflet/dist/leaflet.css";

import RouteComponent from './Route';
import { useRef, useState } from 'react';


function App() {
  const [contextItems] = useState<IContextProps>({
    toast: useRef<any>(null),
    opNotification: useRef<any>(null),
    opUsers: useRef<any>(null),
  });

  createBrazilianCalendar();

  moment.locale('pt-br');

  return (
    <div>
      <Provider store={store}>
        <ThemeContext.Provider value={contextItems}>
          <Toast ref={contextItems.toast} />
          <RouteComponent />
        </ThemeContext.Provider>
      </Provider>
    </div >
  );
}

export default App;
