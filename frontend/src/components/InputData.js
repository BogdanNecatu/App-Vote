import React, { useState } from 'react';
import classes from './InputData.module.css';
import axios from 'axios';

function InputData(props) {
  const [formData, setFormData] = useState('');
  const [formTitle, setFormTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      title: formTitle,
      description: formData,
    };

    try {
      await axios.post('http://localhost:4000/api/data', newData);
      setFormData('');
      setFormTitle('');
      props.updateData();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeData = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
  };

  const onChangeTitle = (e) => {
    e.preventDefault();
    setFormTitle(e.target.value);
  };

  return (
    <div className={classes.container}>
      <h1>Question title:</h1>
      <input type="text" value={formTitle} onChange={onChangeTitle} />

      <h2>Enter a new question:</h2>
      <input type="text" value={formData} onChange={onChangeData} />

      <button type="submit" onClick={handleSubmit} className={classes.button}>
        ADD
      </button>
    </div>
  );
}

export default InputData;
