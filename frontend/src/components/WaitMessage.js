import React from 'react';
import classes from './WaitMessage.module.css';

function WaitMessage({ title, children }) {
  // console.log(props);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <h2>{title}</h2>
        <h1>{children}</h1>
      </div>
    </React.Fragment>
  );
}

export default WaitMessage;
