import * as ActionTypes from './ActionType';

export const FlightReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_Flights:
      return {...state, flights: action.payload};

    default:
      return state;
  }
};