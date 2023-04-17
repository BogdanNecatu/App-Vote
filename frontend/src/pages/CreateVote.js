import PageContent from '../components/PageContent';
import InputData from '../components/InputData';
import React, { useEffect, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';
import SummaryVoting from '../components/SummaryVoting';
import jwt_decode from 'jwt-decode';

function CreateVote() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [stateUpdate, setStateUpdate] = useState(false);

  const navigate = useNavigate();
  const token = useRouteLoaderData('root');
  // const token = '1111111111111wwwwwwwwww';

  let userDecode = '';
  let admin = '';

  if (token) {
    userDecode = jwt_decode(token);
    admin = userDecode.role;
  }

  const updateData = () => {
    setStateUpdate(true);
  };

  useEffect(() => {
    if (!token) navigate('/');
    if (admin !== 'admin') navigate('/');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateUpdate, admin, token]);

  return (
    <React.Fragment>
      <PageContent title="Create Vote:"></PageContent>
      {token && admin === 'admin' && <InputData updateData={updateData} />}
      <div>
        {error && <h1 style={{ textAlign: 'center' }}>Something went wrong... {error}</h1>}

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
    </React.Fragment>
  );
}

export default CreateVote;
