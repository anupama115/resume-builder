import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { routes } from './routes';
import NavbarComponent from './components/Navbar';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavbarComponent />,
      children: routes
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
