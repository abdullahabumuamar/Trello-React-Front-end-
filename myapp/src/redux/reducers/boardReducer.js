//boardReducer manages the state related to boards
import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  CREATE_BOARD_SUCCESS,
  UPDATE_BOARD_SUCCESS,
  DELETE_BOARD_SUCCESS
} from '../actions/boardActions';
// what the data looks like by default
const initialState = {
  boards: [], // all boards will be stored here
  loading: false, // true when data is being fetched
  error: null // stores any error messages
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: action.payload,
        error: null
      };
    case FETCH_BOARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_BOARD_SUCCESS:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      };
    case UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.id ? action.payload : board
        )
      };
    case DELETE_BOARD_SUCCESS:
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload)
      };
    default:
      return state;
  }
};

export default boardReducer; 