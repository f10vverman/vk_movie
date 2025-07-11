import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import DetilsPage from '../pages/detils-page/DetilsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />, 
      },
      {
        path: ':damn',
        element: <DetilsPage />,
      },
    ],
  },
]);

export default router;