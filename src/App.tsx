import { createHashRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { ItemPage } from './pages/ItemPage/ItemPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';

export const App = () => {
  const router = createHashRouter([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <CatalogPage />,
        },
        {
          path: '/:itemId',
          element: <ItemPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: '/404',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
