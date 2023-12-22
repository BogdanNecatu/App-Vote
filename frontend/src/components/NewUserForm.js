import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classes from './NewUserForm.module.css';
import axios from 'axios';

function NewUserForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      passwordConfirm,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/users', newUser);
      console.log(response.status);
      if (response.status === 201) {
        alert('Registration Successful');
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        navigate('/login');
      } else {
        alert('Something went wrong !!');
      }
    } catch (error) {
      // setError(` Please check the input fields. ${error.message}!   `);
      setError(error.response.data);
    }
  };
  // console.log(error);

  // const showerrors = (e) => {
  //   const startTag = '<pre>';
  //   const endTag = '</pre>';
  //   const startIndex = e.indexOf(startTag) + startTag.length;
  //   const endIndex = e.indexOf(endTag);
  //   const errorText = e.substring(startIndex, endIndex);

  //   // Split the error message into individual errors
  //   const errorList = errorText.split(',');

  //   // Trim and clean up each error message
  //   return errorList.map((error) => error.trim().replace(/<br>/g, ''));
  // };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1>Sign In</h1>
        {error && <span style={{ color: '#E7504D', height: '5px' }}>{error}</span>}
        <div>
          <label>Full name</label>
          <input
            type="text"
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div>
          <label>Password Confirm</label>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            required
          />
        </div>
        <div className={classes.actions}>
          <h3>
            Already registered, <Link to={'/login'}> Click to Log In</Link>
          </h3>
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewUserForm;
