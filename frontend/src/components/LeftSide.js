/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';

import classes from './LeftSide.module.css';

function LeftSide({ id }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('Not users Conected!');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');

        const filteredUsers = Object.values(response.data.data).filter(
          (user) => user.connectedLive === true
        );

        setUsers(filteredUsers);
        console.log(users);
      } catch (error) {
        setError(error.response.user.message);
        console.log(error.message);
      }
    })();
  }, [id]);

  return (
    <>
      <div className={classes.container}>
        <h1>Users Connected live : {users.length}</h1>
        <div>
          {users.length === 0 && <h3>{error}</h3>}
          {users.map((user, index) => (
            <ul key={index}>
              <li>
                <h2>
                  {index + 1}. {user.name}
                </h2>
              </li>
            </ul>
          ))}
        </div>
      </div>
      ;
    </>
  );
}

export default LeftSide;
