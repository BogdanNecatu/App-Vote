import { redirect } from 'react-router-dom';
import axios from 'axios';

export function action({ id }) {
  (async () => {
    try {
      const userIsLive = { connectedLive: false };
      const res = await axios.patch('http://localhost:4000/api/users/' + id, userIsLive);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  })();

  localStorage.removeItem('token');
  localStorage.removeItem('expiration');

  return redirect('/');
}
