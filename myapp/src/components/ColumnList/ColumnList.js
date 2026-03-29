import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import styles from './ColumnList.module.css';

const ColumnList = ({ columns, onDeleteColumn, onEditColumn, onUpdateColumns, boardId }) => {
  const [validColumns, setValidColumns] = useState([]);

  useEffect(() => {
    // Filter out columns with invalid IDs and ensure all columns have valid IDs
    const processedColumns = columns.map(column => {
      if (!column.id || typeof column.id !== 'string') {
        console.error('Invalid column ID found:', column);
        return {
          ...column,
          id: `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
      }
      return column;
    });
    setValidColumns(processedColumns);
  }, [columns]);
//manages the entire drag and drop operation,and it i
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside of a droppable area or dropped in the same position
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Find source and destination columns
    const sourceColumn = validColumns.find(col => col.id === source.droppableId);
    const destinationColumn = validColumns.find(col => col.id === destination.droppableId);

    // Validate columns exist
    if (!sourceColumn) {
      console.error(`Source column not found: ${source.droppableId}`);
      return;
    }
    if (!destinationColumn) {
      console.error(`Destination column not found: ${destination.droppableId}`);
      return;
    }

    // Ensure cards arrays exist and filter out null values
    const sourceCards = Array.isArray(sourceColumn.cards) 
      ? sourceColumn.cards.filter(card => card !== null) 
      : [];
    const destinationCards = Array.isArray(destinationColumn.cards) 
      ? destinationColumn.cards.filter(card => card !== null) 
      : [];

    // Validate indices
    if (source.index < 0 || source.index >= sourceCards.length) {
      console.error(`Invalid source index: ${source.index}`);
      return;
    }
    if (destination.index < 0 || destination.index > destinationCards.length) {
      console.error(`Invalid destination index: ${destination.index}`);
      return;
    }

    try {
      if (source.droppableId === destination.droppableId) {
        // Moving within the same column
        const [movedCard] = sourceCards.splice(source.index, 1);
        sourceCards.splice(destination.index, 0, movedCard);
        
        const newColumns = validColumns.map(col => {
          if (col.id === sourceColumn.id) {
            return { ...col, cards: sourceCards };
          }
          return col;
        });
        
        onUpdateColumns(newColumns);
        return;
      }

      // Moving between columns
      const [movedCard] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, movedCard);

      const newColumns = validColumns.map(col => {
        if (col.id === sourceColumn.id) {
          return { ...col, cards: sourceCards };
        }
        if (col.id === destinationColumn.id) {
          return { ...col, cards: destinationCards };
        }
        return col;
      });

      onUpdateColumns(newColumns);
    } catch (error) {
      console.error('Error during drag and drop operation:', error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columnList}>
        {validColumns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            index={index}
            onDeleteColumn={onDeleteColumn}
            onEditColumn={onEditColumn}
            boardId={boardId}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default ColumnList; 