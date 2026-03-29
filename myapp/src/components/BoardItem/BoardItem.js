import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardItem.module.css';

const BoardItem = ({ board, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (newTitle.trim()) {
      onEdit(board.id, newTitle);
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    navigate(`/board/${board.id}`, { state: { board, title: board.title } });
  };
  

  return (
    <div className={styles.boardItem}>
      {isEditing ? (
        <div className={styles.editMode}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <div className={styles.editButtons}>
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.viewMode}>
          <h3 onClick={handleClick}>{board.title}</h3>
          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(board.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardItem; 