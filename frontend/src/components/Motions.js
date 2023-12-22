import React from 'react';
import classes from './Motions.module.css';

function Motions({ title, intrebare }) {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div>
          <h1>{title}:</h1>
          <h2>"{intrebare}?"</h2>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Motions;
