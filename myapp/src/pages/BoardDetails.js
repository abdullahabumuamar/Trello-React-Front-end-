import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './BoardDetails.module.css';
import ColumnList from '../components/ColumnList/ColumnList';
import CreateColumn from '../components/CreateColumn/CreateColumn';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { getBoard, createColumn, updateColumn, deleteColumn, updateBoard } from '../services/api';

const BoardDetails = () => {
  const { boardId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBoard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const boardData = await getBoard(boardId);
      
      // Check if the board belongs to the current user
      if (boardData.userId !== currentUser.id) {
        setError('You do not have permission to view this board');
        return;
      }
      
      setBoard(boardData);
    } catch (err) {
      console.error('Error loading board:', err);
      setError('Error loading board. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [boardId, currentUser]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const handleCreateColumn = useCallback(async (title) => {
    try {
      setError(null);
      const columnId = `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newColumn = {
        id: columnId,
        title,
        cards: []
      };
      await createColumn(boardId, newColumn);
      await fetchBoard();
    } catch (err) {
      console.error('Error creating column:', err);
      setError('Error creating column. Please try again.');
    }
  }, [boardId, fetchBoard]);

  const handleDeleteColumn = useCallback(async (columnId) => {
    try {
      setError(null);
      await deleteColumn(boardId, columnId);
      await fetchBoard();
    } catch (err) {
      console.error('Error deleting column:', err);
      setError('Error deleting column. Please try again.');
    }
  }, [boardId, fetchBoard]);

  const handleEditColumn = useCallback(async (columnId, newTitle) => {
    try {
      setError(null);
      const column = board.columns.find(col => col.id === columnId);
      if (!column) {
        throw new Error(`Column ${columnId} not found`);
      }
      const updatedColumn = { ...column, title: newTitle };
      await updateColumn(boardId, columnId, updatedColumn);
      await fetchBoard();
    } catch (err) {
      console.error('Error updating column:', err);
      setError('Error updating column. Please try again.');
    }
  }, [boardId, board?.columns, fetchBoard]);

  const handleUpdateColumns = useCallback(async (newColumns) => {
    try {
      setError(null);
      const updatedBoard = { ...board, columns: newColumns };
      await updateBoard(boardId, updatedBoard);
      setBoard(updatedBoard);
    } catch (err) {
      console.error('Error updating column order:', err);
      setError('Error updating column order. Please try again.');
    }
  }, [boardId, board]);

  const handleBackToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const memoizedColumnList = useMemo(() => (
    <ColumnList
      columns={board?.columns || []}
      onDeleteColumn={handleDeleteColumn}
      onEditColumn={handleEditColumn}
      onUpdateColumns={handleUpdateColumns}
      boardId={boardId}
    />
  ), [board?.columns, boardId, handleDeleteColumn, handleEditColumn, handleUpdateColumns]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!board) return <div className={styles.notFound}>Board not found</div>;

  return (
    <div className={styles.boardDetails}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <button className={styles.backButton} onClick={handleBackToHome}>
            ← Back
          </button>
          <h2 className={styles.boardTitle}>{board.title}</h2>
        </div>
        <div className={styles.controls}>
          <CreateColumn onCreate={handleCreateColumn} />
        </div>
      </div>
      <div className={styles.content}>
        {memoizedColumnList}
      </div>
      <ThemeToggle />
    </div>
  );
};

export default BoardDetails; 