import React, { useState, useEffect } from 'react';
import classes from './Timer.module.css';
import { useRouteLoaderData } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';

const Timer = (props) => {
  const [time, setTime] = useState(props.duration);
  const [start, setStart] = useState(false);

  const socket = io('http://localhost:4000');

  const token = useRouteLoaderData('root');
  let userDecode = '';
  let admin = '';

  if (token) {
    userDecode = jwt_decode(token);
    admin = userDecode.role;
  }

  const startVote = () => {
    props.startVote();
  };

  const startTimer = () => {
    socket.emit('start', true);
    startVote();
  };

  useEffect(() => {
    socket.on('recieved_message', (data) => setStart(data));
  }, [socket, props]);

  useEffect(() => {
    let interval;
    if (start && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, start]);

  if (time === 0) console.log('Time out');

  const formatedTime = (milliseconds) => {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinutes = parseInt(Math.floor(totalSeconds / 60));

    let seconds = parseInt(totalSeconds % 60);
    let minutes = parseInt(totalMinutes % 60);

    return ` ${minutes} min : ${seconds} s `;
  };
  return (
    <div className={classes.container}>
      <h3> Time to vote:</h3>
      <form> {formatedTime(time)}</form>
      {admin === 'admin' && (
        <button type="submit" onClick={startTimer}>
          Start Voting
        </button>
      )}
    </div>
  );
};

export default Timer;
