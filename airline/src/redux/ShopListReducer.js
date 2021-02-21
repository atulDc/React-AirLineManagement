import * as ActionTypes from './ActionType';

export const ShopListReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_ShopList:
      return {...state, shopLists: action.payload};

    default:
      return state;
  }
};