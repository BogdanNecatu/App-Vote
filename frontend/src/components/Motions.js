import React from 'react';
import classes from './Motions.module.css';

function Motions(props) {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div>
          <h1>{props.title}:</h1>
          <h2>"{props.intrebare}?"</h2>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Motions;
