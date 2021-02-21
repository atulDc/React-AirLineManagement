import * as ActionTypes from './ActionType';

export const AncillaryQuantityReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_AncillaryItemQuantity:
      return {...state, AncillaryItemQuantity: action.payload};

    default:
      return state;
  }
};