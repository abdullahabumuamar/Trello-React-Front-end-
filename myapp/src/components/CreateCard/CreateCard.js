import React, { useState } from 'react';
import styles from './CreateCard.module.css';

const CreateCard = ({ onCreateCard }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardData, setCardData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardData.title.trim()) {
      onCreateCard(cardData.title.trim(), cardData.description.trim());
      setCardData({ title: '', description: '' });
      setIsFormVisible(false);
    }
  };

  const handleCancel = () => {
    setCardData({ title: '', description: '' });
    setIsFormVisible(false);
  };

  if (!isFormVisible) {
    return (
      <button 
        className={styles.addButton}
        onClick={() => setIsFormVisible(true)}
      >
        <span>+ Add Card</span>
      </button>
    );
  }

  return (
    <form className={styles.createCard} onSubmit={handleSubmit}>
      <input
        type="text"
        value={cardData.title}
        onChange={(e) => setCardData({...cardData, title: e.target.value})}
        placeholder="Enter card title..."
        autoFocus
      />
      <textarea
        value={cardData.description}
        onChange={(e) => setCardData({...cardData, description: e.target.value})}
        placeholder="Enter card description..."
      />
      <div className={styles.buttons}>
        <button type="submit">Add Card</button>
        <button 
          type="button" 
          onClick={handleCancel}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCard; 