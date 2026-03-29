import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling 
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      throw new Error('Server connection error. Please try again');
    }
    throw error;
  }
);

// Authentication operations
export const login = async (email, password) => {
  try {
    const response = await api.get(`/users?email=${email}`);
    const users = response.data;
    
    if (users.length === 0) {
      throw new Error('Email not found');
    }
    
    const user = users[0];
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (error.message === 'Email not found' || error.message === 'Invalid password') {
      throw error;
    }
    throw new Error('Server connection error. Please try again');
  }
};

export const register = async (email, password) => {
  try {
    // Check if user already exists
    const existingUsers = await api.get(`/users?email=${email}`);
    
    if (existingUsers.data.length > 0) {
      throw new Error('Email already exists');
    }
    
    // Create new user
    const newUser = {
      email,
      password
    };
    
    const response = await api.post('/users', newUser);
    
    // Don't return the password
    const { password: _, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  } catch (error) {
    if (error.message === 'Email already exists') {
      throw error;
    }
    throw new Error('Server connection error. Please try again');
  }
};

// Board operations
export const getBoards = async (userId) => {
  try {
    const response = await api.get(`/boards?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const getBoard = async (id) => {
  try {
    const response = await api.get(`/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching board ${id}:`, error);
    throw error;
  }
};

export const createBoard = async (board) => {
  try {
    const response = await api.post('/boards', board);
    return response.data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

export const updateBoard = async (id, board) => {
  try {
    const response = await api.put(`/boards/${id}`, board);
    return response.data;
  } catch (error) {
    console.error(`Error updating board ${id}:`, error);
    throw error;
  }
};

export const deleteBoard = async (id) => {
  try {
    await api.delete(`/boards/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting board ${id}:`, error);
    throw error;
  }
};

// Column operations
export const createColumn = async (boardId, column) => {
  try {
    const board = await getBoard(boardId);
    const updatedBoard = {
      ...board,
      columns: [...board.columns, column]
    };
    const response = await updateBoard(boardId, updatedBoard);
    return response;
  } catch (error) {
    console.error(`Error creating column in board ${boardId}:`, error);
    throw error;
  }
};

export const updateColumn = async (boardId, columnId, updatedColumn) => {
  try {
    const board = await getBoard(boardId);
    const updatedColumns = board.columns.map(col => 
      col.id === columnId ? { ...col, ...updatedColumn } : col
    );
    const response = await updateBoard(boardId, { ...board, columns: updatedColumns });
    return response;
  } catch (error) {
    console.error(`Error updating column ${columnId} in board ${boardId}:`, error);
    throw error;
  }
};

export const deleteColumn = async (boardId, columnId) => {
  try {
    const board = await getBoard(boardId);
    const updatedColumns = board.columns.filter(col => col.id !== columnId);
    const response = await updateBoard(boardId, { ...board, columns: updatedColumns });
    return response;
  } catch (error) {
    console.error(`Error deleting column ${columnId} from board ${boardId}:`, error);
    throw error;
  }
};

// Card operations
export const createCard = async (boardId, columnId, card) => {
  try {
    const board = await getBoard(boardId);
    const updatedColumns = board.columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          cards: [...col.cards, card]
        };
      }
      return col;
    });
    const response = await updateBoard(boardId, { ...board, columns: updatedColumns });
    return response;
  } catch (error) {
    console.error(`Error creating card in column ${columnId} of board ${boardId}:`, error);
    throw error;
  }
};

export const updateCard = async (boardId, columnId, cardId, updatedCard) => {
  try {
    const board = await getBoard(boardId);
    const updatedColumns = board.columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          cards: col.cards.map(card => 
            card.id === cardId ? { ...card, ...updatedCard } : card
          )
        };
      }
      return col;
    });
    const response = await updateBoard(boardId, { ...board, columns: updatedColumns });
    return response;
  } catch (error) {
    console.error(`Error updating card ${cardId} in column ${columnId} of board ${boardId}:`, error);
    throw error;
  }
};

export const deleteCard = async (boardId, columnId, cardId) => {
  try {
    const board = await getBoard(boardId);
    const updatedColumns = board.columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== cardId)
        };
      }
      return col;
    });
    const response = await updateBoard(boardId, { ...board, columns: updatedColumns });
    return response;
  } catch (error) {
    console.error(`Error deleting card ${cardId} from column ${columnId} of board ${boardId}:`, error);
    throw error;
  }
};



export default api; 