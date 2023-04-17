import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import classes from './AuthForm.module.css';
function AuthForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const isSubmitting = navigate.state === 'submitting';
  let response = '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      response = await axios.post('http://localhost:4000/api/users/login', userData);
      if (response.status === 422 || response.status === 401) {
        return response;
      }

      if (response.status === 200) {
        alert('User successfully connected');
        setEmail('');
        setPassword('');
        const token = response.data.token;

        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());
        // console.log(`Token created:${token}, Expiration date:${expiration.toISOString()}`);

        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      setError(
        error.response.data.message || 'An error occurred. Please check the email and password!'
      );
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <form method="post" className={classes.form}>
        <h1> Log in</h1>
        {error && <p style={{ color: '#E7504D', height: '5px' }}>{error}!</p>}

        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </p>

        <div className={classes.actions}>
          <h3>
            <Link to={'/signup'}>Sing In for new User</Link>
          </h3>
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Connect...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
