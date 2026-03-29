import { createColumn, updateColumn, deleteColumn } from '../../services/api';

// Action Types
export const CREATE_COLUMN_SUCCESS = 'CREATE_COLUMN_SUCCESS';
export const UPDATE_COLUMN_SUCCESS = 'UPDATE_COLUMN_SUCCESS';
export const DELETE_COLUMN_SUCCESS = 'DELETE_COLUMN_SUCCESS';

// Action Creators
export const addColumn = (boardId, column) => async (dispatch) => {
  try {
    const newColumn = await createColumn(boardId, column);
    dispatch({ type: CREATE_COLUMN_SUCCESS, payload: { boardId, column: newColumn } });
    return newColumn;
  } catch (error) {
    throw error;
  }
};

export const editColumn = (boardId, columnId, updatedColumn) => async (dispatch) => {
  try {
    const column = await updateColumn(boardId, columnId, updatedColumn);
    dispatch({ type: UPDATE_COLUMN_SUCCESS, payload: { boardId, columnId, column } });
    return column;
  } catch (error) {
    throw error;
  }
};

export const removeColumn = (boardId, columnId) => async (dispatch) => {
  try {
    await deleteColumn(boardId, columnId);
    dispatch({ type: DELETE_COLUMN_SUCCESS, payload: { boardId, columnId } });
  } catch (error) {
    throw error;
  }
}; 