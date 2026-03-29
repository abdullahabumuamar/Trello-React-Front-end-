import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Card.module.css';

const Card = ({ card, index, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: card.title,
    description: card.description
  });

  const handleSave = () => {
    if (editData.title.trim()) {
      onEdit(card.id, editData);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.card} ${card.completed ? styles.completed : ''}`}
        >
          {isEditing ? (
            <div className={styles.editForm}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                placeholder="Enter card title"
                autoFocus
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                placeholder="Enter card description"
              />
              <div className={styles.actions}>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  <input
                    type="checkbox"
                    checked={card.completed}
                    onChange={() => onToggleComplete(card.id)}
                    className={styles.checkbox}
                  />
                </div>
                {card.description && (
                  <p className={styles.cardDescription}>{card.description}</p>
                )}
              </div>
              <div className={styles.actions}>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onDelete(card.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card; 