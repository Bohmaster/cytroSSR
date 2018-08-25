import About from './screens/About';
import Home from './screens/Home';
import Users from './screens/Users';
import PropDetalle from './screens/PropDetalle';
import Propiedades from './screens/Propiedades';
import Contacto from './screens/Contacto';
import Empresa from './screens/Empresa';
import Servicio from './screens/Servicio';

// This is a static route configuration. It should include all of your top level
// routes, regardless of whether they are going to server render. In fact, you
// can totally point multiple routes to the same component! This is great for
// when you only need to server render a handful of routes and not your entire
// application!
const routes = [
  {
    path: '/home',
    component: Home,
    name: 'Home',
    exact: true
  },
  // {
  //   path: '/propiedad/:id',
  //   component: Users,
  //   name: 'Propiedad',
  // },
  {
    path: '/buscar',
    component: Users,
    name: 'Buscar'
  },
  {
    path: '/propiedad',
    component: PropDetalle,
    name: 'DetalleProp',
    exact: true
  },
  {
    path: '/propiedades',
    component: Propiedades,
    name: 'Propiedades',
    exact: true
  },
  {
    path: '/contacto',
    component: Contacto,
    name: Contacto,
    exact: true
  },
  {
    path: '/empresa',
    component: Empresa,
    name: Empresa,
    exact: true
  },
  {
    path: '/servicios',
    component: Servicio,
    name: Servicio,
    exact: true
  },
];

export default routes;
