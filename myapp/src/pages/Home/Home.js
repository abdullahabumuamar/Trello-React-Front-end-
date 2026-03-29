import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';
import BoardList from '../../components/BoardList/BoardList';
import CreateBoard from '../../components/CreateBoard/CreateBoard';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { fetchBoards, addBoard, editBoard, removeBoard } from '../../redux/actions/boardActions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { boards, loading, error } = useSelector(state => state.boards);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchBoards(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const handleCreateBoard = async (title) => {
    try {
      const newBoard = {
        title,
        columns: []
      };
      await dispatch(addBoard(newBoard, currentUser.id));
    } catch (err) {
      console.error('Error creating board:', err);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await dispatch(removeBoard(boardId));
    } catch (err) {
      console.error('Error deleting board:', err);
    }
  };

  const handleEditBoard = async (boardId, newTitle) => {
    try {
      const board = boards.find(b => b.id === boardId);
      if (!board) {
        throw new Error(`Board with ID ${boardId} not found`);
      }
      const updatedBoard = { ...board, title: newTitle };
      await dispatch(editBoard(boardId, updatedBoard));
    } catch (err) {
      console.error('Error updating board:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>My Boards</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <CreateBoard onCreate={handleCreateBoard} />
      
      <BoardList
        boards={boards}
        onDelete={handleDeleteBoard}
        onEdit={handleEditBoard}
      />

      <ThemeToggle />
    </div>
  );
};

export default Home; 