import { createCard, updateCard, deleteCard } from '../../services/api';

// Action Types
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';

// Action Creators
export const addCard = (boardId, columnId, card) => async (dispatch) => {
  try {
    const newCard = await createCard(boardId, columnId, card);
    dispatch({ 
      type: CREATE_CARD_SUCCESS, 
      payload: { boardId, columnId, card: newCard } 
    });
    return newCard;
  } catch (error) {
    throw error;
  }
};

export const editCard = (boardId, columnId, cardId, updatedCard) => async (dispatch) => {
  try {
    const card = await updateCard(boardId, columnId, cardId, updatedCard);
    dispatch({ 
      type: UPDATE_CARD_SUCCESS, 
      payload: { boardId, columnId, cardId, card } 
    });
    return card;
  } catch (error) {
    throw error;
  }
};

export const removeCard = (boardId, columnId, cardId) => async (dispatch) => {
  try {
    await deleteCard(boardId, columnId, cardId);
    dispatch({ 
      type: DELETE_CARD_SUCCESS, 
      payload: { boardId, columnId, cardId } 
    });
  } catch (error) {
    throw error;
  }
}; 