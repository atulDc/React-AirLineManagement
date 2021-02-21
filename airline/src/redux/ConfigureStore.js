import {createStore, combineReducers, applyMiddleware} from 'redux';
import { FlightReducer } from './FlightReducer';
import {PassangerReducer} from './PassangerReducer';
import {CheckinReducer} from './CheckinReducer';
import {ShopListReducer} from './ShopListReducer';
import {ShoppedQuantityReducer} from './ShoppedQuantityReducer';
import {AncillaryListReducer} from './AncillaryListReducer';
import {AncillaryQuantityReducer} from './AncillaryQuantityReducer';
import {FoodListReducer} from './FoodListReducer';
import {FoodQuantityReducer} from './FoodQuantityReducer';
import {StaffListReducer} from './StaffListReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            flights: FlightReducer,
            passangers: PassangerReducer,
            checkIns: CheckinReducer,
            shopLists: ShopListReducer,
            shoppedItemQuantity: ShoppedQuantityReducer,
            AncillaryLists:AncillaryListReducer,
            AncillaryItemQuantity: AncillaryQuantityReducer,
            FoodLists: FoodListReducer,
            FoodItemQuantity: FoodQuantityReducer,
            staffs: StaffListReducer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};