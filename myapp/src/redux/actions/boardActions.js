import { getBoards, createBoard, updateBoard, deleteBoard } from '../../services/api';

// Action Types
export const FETCH_BOARDS_REQUEST = 'FETCH_BOARDS_REQUEST';
export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS';
export const FETCH_BOARDS_FAILURE = 'FETCH_BOARDS_FAILURE';
export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS';
export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS';
export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS';

// Action Creators
export const fetchBoards = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_BOARDS_REQUEST });
  try {
    const boards = await getBoards(userId);
    dispatch({ type: FETCH_BOARDS_SUCCESS, payload: boards });
  } catch (error) {
    dispatch({ type: FETCH_BOARDS_FAILURE, payload: error.message });
  }
};

export const addBoard = (board, userId) => async (dispatch) => {
  try {
    const boardWithUserId = {
      ...board,
      userId
    };
    const newBoard = await createBoard(boardWithUserId);
    dispatch({ type: CREATE_BOARD_SUCCESS, payload: newBoard });
    return newBoard;
  } catch (error) {
    throw error;
  }
};

export const editBoard = (boardId, updatedBoard) => async (dispatch) => {
  try {
    const board = await updateBoard(boardId, updatedBoard);
    dispatch({ type: UPDATE_BOARD_SUCCESS, payload: board });
    return board;
  } catch (error) {
    throw error;
  }
};

export const removeBoard = (boardId) => async (dispatch) => {
  try {
    await deleteBoard(boardId);
    dispatch({ type: DELETE_BOARD_SUCCESS, payload: boardId });
  } catch (error) {
    throw error;
  }
}; 