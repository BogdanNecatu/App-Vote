import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';
import LeftSide from '../components/LeftSide';
import jwt_decode from 'jwt-decode';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();

  let id = '';

  if (token) {
    const userDecode = jwt_decode(token);
    id = userDecode.id;
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);
  console.log(id);

  return (
    <>
      <MainNavigation id={id} />
      <main>
        <LeftSide id={id} />
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
