import PageContent from '../components/PageContent';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
function HomePage() {
  const token = useLoaderData();

  useEffect(() => {
    if (token) window.location.reload();
  }, [token]);

  return (
    <>
      <PageContent title="Welcome!">
        <h3>The voting application is available </h3>
      </PageContent>

      <Outlet />
    </>
  );
}

export default HomePage;
