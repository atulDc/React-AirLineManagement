import * as ActionTypes from './ActionType';

export const FoodQuantityReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_FoodItemQuantity:
      return {...state, FoodItemQuantity: action.payload};

    default:
      return state;
  }
};