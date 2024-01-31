import { redirect } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function action() {
  const token = localStorage.getItem('token');

  if (token) {
    const userDecode = jwt_decode(token);
    const id = userDecode.id;

    (async () => {
      try {
        const userIsLive = { connectedLive: false };
        const res = await axios.patch('http://localhost:4000/api/users/' + id, userIsLive);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  localStorage.removeItem('token');
  localStorage.removeItem('expiration');

  return redirect('/');
}
