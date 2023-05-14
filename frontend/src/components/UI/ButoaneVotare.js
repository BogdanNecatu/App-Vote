import React, { useState } from 'react';
import axios from 'axios';

import classes from './ButoaneVotare.module.css';
import WaitMessage from '../WaitMessage';

let rezultatVotare = [];

const ButoaneVotare = (props) => {
  const [buttonDa, setButtonDa] = useState(false);
  const [buttonAbtin, setButtonAbtin] = useState(false);
  const [buttonNu, setButtonNu] = useState(false);
  const [buttonRezultate, setButtonRezultate] = useState(true);
  const [rezultate, setRezultate] = useState(false);

  const dataId = props.dataId;
  const userId = props.userId;

  //Butonul Da
  const ButtonDa = (e) => {
    //disable button Abtin si Nu
    setButtonAbtin(true);
    setButtonDa(true);
    setButtonNu(true);
    setButtonRezultate(false);
    e.target.style.backgroundColor = 'green';
    if (e.target) {
      rezultatVotare.push(1, 0, 0);
    }
  };

  //Butonul cu Abtin
  const ButtonAbtin = (e) => {
    //disable button Da si Nu

    setButtonNu(true);
    setButtonDa(true);
    setButtonAbtin(true);
    setButtonRezultate(false);
    e.target.style.backgroundColor = 'grey';
    if (e.target) {
      rezultatVotare.push(0, 1, 0);
    }
  };
  //Butonul cu Nu
  const ButtonNu = (e) => {
    //disable button Da si Abtin
    setButtonDa(true);
    setButtonNu(true);
    setButtonAbtin(true);
    setButtonRezultate(false);
    e.target.style.backgroundColor = 'red';
    if (e.target) {
      rezultatVotare.push(0, 0, 1);
    }
  };

  const ButtonRezultate = async (e, props) => {
    setRezultate(true);
    e.target.style.display = 'none';
    setButtonRezultate(true);
    try {
      const result = await axios.patch('http://localhost:4000/api/data/' + dataId, {
        $push: {
          voturi: {
            userId,
            raspunsDa: rezultatVotare[0],
            raspunsAbtin: rezultatVotare[1],
            raspunsNu: rezultatVotare[2],
          },
        },
      });
      // alert('Vot inregistrat');
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    rezultatVotare = [];
  };
  console.log(rezultate);
  return (
    <React.Fragment>
      {!rezultate && (
        <div className={classes.container}>
          <button disabled={(buttonNu, buttonDa, buttonAbtin)} onClick={ButtonDa}>
            Yes I agree!
          </button>
          <button disabled={(buttonNu, buttonDa, buttonAbtin)} onClick={ButtonAbtin}>
            I abstain!
          </button>
          <button disabled={(buttonDa, buttonNu, buttonAbtin)} onClick={ButtonNu}>
            NO, I don't agree!
          </button>
        </div>
      )}
      {rezultate ? (
        <WaitMessage
          title="Vote sent, please wait until the end of voting!!!"
          children="            Thank you!!"
        />
      ) : null}
      <div className={classes.container}>
        <button className={classes.rezultate} disabled={buttonRezultate} onClick={ButtonRezultate}>
          Send Vote!
        </button>
      </div>
    </React.Fragment>
  );
};
export default ButoaneVotare;
