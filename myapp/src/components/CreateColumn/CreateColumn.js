import React, { useState } from 'react';
import styles from './CreateColumn.module.css';

const CreateColumn = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
      setTitle('');
      setIsFormVisible(false);
    }
  };

  if (!isFormVisible) {
    return (
      <button 
        className={styles.addButton}
        onClick={() => setIsFormVisible(true)}
      >
        <span>+ Add Column</span>
      </button>
    );
  }

  return (
    <form className={styles.createColumn} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter column title"
        autoFocus
      />
      <div className={styles.buttons}>
        <button type="submit">Add Column</button>
        <button 
          type="button" 
          onClick={() => setIsFormVisible(false)}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateColumn; 