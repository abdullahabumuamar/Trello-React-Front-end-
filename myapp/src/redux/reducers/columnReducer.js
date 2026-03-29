import {
  CREATE_COLUMN_SUCCESS,
  UPDATE_COLUMN_SUCCESS,
  DELETE_COLUMN_SUCCESS
} from '../actions/columnActions';

const initialState = {
  columns: {}
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COLUMN_SUCCESS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.boardId]: [
            ...(state.columns[action.payload.boardId] || []),
            action.payload.column
          ]
        }
      };
    case UPDATE_COLUMN_SUCCESS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.boardId]: state.columns[action.payload.boardId].map(column =>
            column.id === action.payload.columnId ? action.payload.column : column
          )
        }
      };
    case DELETE_COLUMN_SUCCESS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.boardId]: state.columns[action.payload.boardId].filter(
            column => column.id !== action.payload.columnId
          )
        }
      };
    default:
      return state;
  }
};

export default columnReducer; 