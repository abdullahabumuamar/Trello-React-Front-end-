import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import Card from '../Card/Card';
import CreateCard from '../CreateCard/CreateCard';
import { createCard, updateCard, deleteCard } from '../../services/api';

const Column = ({ column, index, onDeleteColumn, onEditColumn, boardId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [cards, setCards] = useState([]);
  const [columnId, setColumnId] = useState(column.id);

  useEffect(() => {
    // Ensure column ID is valid
    if (!column.id || typeof column.id !== 'string') {
      console.error('Invalid column ID:', column.id);
      setColumnId(`col-${Date.now()}`);
    } else {
      setColumnId(column.id);
    }
  }, [column.id]);

  useEffect(() => {
    // Filter out any null cards and ensure cards is always an array
    const validCards = Array.isArray(column.cards) 
      ? column.cards.filter(card => card !== null) 
      : [];
    setCards(validCards);
  }, [column.cards]);

  const handleCreateCard = async (title, description) => {
    try {
      const newCard = {
        id: `card-${Date.now()}`,
        title,
        description,
        completed: false
      };
      await createCard(boardId, columnId, newCard);
      setCards([...cards, newCard]);
    } catch (err) {
      console.error('Error creating card:', err);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(boardId, columnId, cardId);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (err) {
      console.error('Error deleting card:', err);
    }
  };

  const handleEditCard = async (cardId, updates) => {
    try {
      await updateCard(boardId, columnId, cardId, updates);
      setCards(cards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
      ));
    } catch (err) {
      console.error('Error updating card:', err);
    }
  };

  const handleToggleComplete = async (cardId) => {
    try {
      const card = cards.find(c => c.id === cardId);
      if (!card) return;
      
      const updates = { ...card, completed: !card.completed };
      await updateCard(boardId, columnId, cardId, updates);
      setCards(cards.map(c =>
        c.id === cardId ? { ...c, completed: !c.completed } : c
      ));
    } catch (err) {
      console.error('Error updating card status:', err);
    }
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    if (newTitle.trim()) {
      onEditColumn(columnId, newTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleTitleSubmit();
              }
            }}
            autoFocus
          />
        ) : (
          <>
            <h3 title={column.title} onClick={() => setIsEditing(true)}>
              {column.title}
            </h3>
            <button onClick={() => onDeleteColumn(columnId)}>×</button>
          </>
        )}
      </div>
      
      <Droppable droppableId={columnId} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.cardList}
          >
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
                onToggleComplete={handleToggleComplete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <CreateCard onCreateCard={handleCreateCard} />
    </div>
  );
};

export default Column; 