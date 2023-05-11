import PageContent from '../components/PageContent';
import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';
import SummaryVoting from '../components/SummaryVoting';

function ProposalsVoted() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const token = useRouteLoaderData('root');
  // const token = '111111111111222222222222222';

  useEffect(() => {
    if (!token) return setError('Unauthorized, Please Log In!');

    (async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    })();
  }, [token]);

  return (
    <>
      <PageContent title="Voted Proposals:"></PageContent>
      {error && (
        <h2 style={{ textAlign: 'center', color: 'black' }}>Something went wrong... {error}</h2>
      )}
      <div>
        {data.map((data) => {
          const voturi = data.voturi || [];
          const result = voturi.reduce(
            (acc, { raspunsDa = 0, raspunsAbtin = 0, raspunsNu = 0 }) => {
              acc.raspunsDa += raspunsDa;
              acc.raspunsAbtin += raspunsAbtin;
              acc.raspunsNu += raspunsNu;
              return acc;
            },
            { raspunsDa: 0, raspunsAbtin: 0, raspunsNu: 0 }
          );
          return (
            <SummaryVoting
              key={data._id}
              title={data.title}
              intrebare={data.description}
              raspunsDa={result.raspunsDa}
              raspunsAbtin={result.raspunsAbtin}
              raspunsNu={result.raspunsNu}
              totalVoturi={data.voturi.length}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProposalsVoted;
