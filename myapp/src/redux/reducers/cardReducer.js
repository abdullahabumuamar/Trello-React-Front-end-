import {
  CREATE_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS
} from '../actions/cardActions';

const initialState = {
  cards: {}
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.boardId]: {
            ...state.cards[action.payload.boardId],
            [action.payload.columnId]: [
              ...(state.cards[action.payload.boardId]?.[action.payload.columnId] || []),
              action.payload.card
            ]
          }
        }
      };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.boardId]: {
            ...state.cards[action.payload.boardId],
            [action.payload.columnId]: state.cards[action.payload.boardId]?.[action.payload.columnId].map(card =>
              card.id === action.payload.cardId ? action.payload.card : card
            )
          }
        }
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.boardId]: {
            ...state.cards[action.payload.boardId],
            [action.payload.columnId]: state.cards[action.payload.boardId]?.[action.payload.columnId].filter(
              card => card.id !== action.payload.cardId
            )
          }
        }
      };
    default:
      return state;
  }
};

export default cardReducer; 