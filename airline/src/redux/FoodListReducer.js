import * as ActionTypes from './ActionType';

export const FoodListReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_FoodList:
      return {...state, FoodLists: action.payload};

    default:
      return state;
  }
};