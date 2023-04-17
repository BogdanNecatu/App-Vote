import PageContent from '../components/PageContent';
import Motions from '../components/Motions';
import ButoaneVotare from '../components/UI/ButoaneVotare';
import WaitMessage from '../components/WaitMessage';
import React, { useState, useEffect } from 'react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Timer from '../components/UI/Timer';
import io from 'socket.io-client';

function Vote() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [voteStart, setVoteStart] = useState(false);
  const socket = io('http://localhost:4000');

  const navigate = useNavigate();

  const token = useRouteLoaderData('root');
  // const token = 'qqqqqqqqqqqqqq';

  let userDecode = '';
  let userId = '';

  if (token) {
    userDecode = jwt_decode(token);
    userId = userDecode.id;
  }

  const startVote = () => {
    setVoteStart(true);
  };

  useEffect(() => {
    socket.on('recieved_message', (data) => setVoteStart(data));
  }, [socket]);

  useEffect(() => {
    if (!token) navigate('/');

    (async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.data[0]);
      } catch (error) {
        setError(error.response.data.message);
        console.log(error.message);
      }
    })();
  }, [token, navigate]);

  return (
    <React.Fragment>
      <PageContent title="Proposal for Vote :"></PageContent>

      <Timer duration={60 * 1000} startVote={startVote} />

      <div>
        {error && <h2 style={{ textAlign: 'center' }}>Something went wrong... {error}</h2>}
        {token && <Motions key={data._id} title={data.title} intrebare={data.description} />}
      </div>
      {voteStart === false && (
        <WaitMessage
          title="Voting will start immediately !"
          children="
        Thank you!"
        />
      )}
      {token && voteStart && <ButoaneVotare dataId={data._id} data={data} userId={userId} />}
    </React.Fragment>
  );
}

export default Vote;

export async function action() {
  window.location.reload();
}
