import { useRouteError, Link } from 'react-router-dom';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page. ';
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
      <Link to="/">
        <button button style={{ height: '60px', width: '200px', fontSize: '25px' }}>
          Click to Go Home Page
        </button>
      </Link>
    </>
  );
}

export default ErrorPage;
