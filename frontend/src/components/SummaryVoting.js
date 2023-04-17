import classes from './SummaryVoting.module.css';
import React from 'react';

function SummaryVoting(props) {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div>
          <h1>{props.title}:</h1>
          <h2>"{props.intrebare}?"</h2>
          <h3>Recorded votes:{props.totalVoturi}</h3>
        </div>
        <div className={classes.grid}>
          <div className={classes.items}>Votes YES: {props.raspunsDa}</div>
          <div className={classes.items}>Votes ABSTEIN: {props.raspunsAbtin}</div>
          <div className={classes.items}>Votes NO: {props.raspunsNu}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SummaryVoting;
