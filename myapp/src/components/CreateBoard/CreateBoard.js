import React, { useState } from 'react';
import styles from './CreateBoard.module.css';

const CreateBoard = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
      setTitle('');
    }
  };

  return (
    <form className={styles.createBoard} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new board name"
      />
      <button type="submit">Create Board</button>
    </form>
  );
};

export default CreateBoard; 