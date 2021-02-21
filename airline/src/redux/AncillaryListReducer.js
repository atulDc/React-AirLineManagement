import * as ActionTypes from './ActionType';

export const AncillaryListReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_AncillaryList:
      return {...state, AncillaryLists: action.payload};

    default:
      return state;
  }
};