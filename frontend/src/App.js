import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import Vote from './pages/Vote';
import Authentication from './pages/Authentication';
import CreateUser from './pages/CreateUser';
import CreateVote from './pages/CreateVote';
import ProposalsVoted from './pages/ProposalsVoted';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader } from './util/auth';
import { action as refreshPage } from './pages/Vote';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'login',
        element: <Authentication />,
      },
      {
        path: 'signup',
        element: <CreateUser />,
      },
      {
        path: 'create-vote',
        element: <CreateVote />,
      },
      {
        path: 'voted-proposals',
        element: <ProposalsVoted />,
      },
      {
        path: 'vote',
        element: <Vote />,
        action: refreshPage,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
