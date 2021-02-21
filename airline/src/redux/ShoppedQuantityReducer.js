import * as ActionTypes from './ActionType';

export const ShoppedQuantityReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_ShoppedItemQuantity:
      return {...state, ShoppedItemQuantity: action.payload};

    default:
      return state;
  }
};