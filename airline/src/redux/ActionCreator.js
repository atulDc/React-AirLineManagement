import * as envUrl from '../components/sharedComponent/baseurl';
import * as ActionTypes from './ActionType';
import qs from 'qs';
import axios from 'axios';

let departureGlobal, arrivalGlobal = null;
let isFailed = false;

export const addFlights = (flights) => ({
    type: ActionTypes.ADD_Flights,
    payload: flights
});

/*Fetch flight from lufthansa open end point*/

export const fetchFlights = (departure, arrival) => (dispatch) => {
    isFailed = false;
    departureGlobal = departure !== null && departure !== undefined ? departure : departureGlobal;
    arrivalGlobal = arrival !== null && arrival !== undefined ? arrival : arrivalGlobal;
    if (departureGlobal !== null && departureGlobal !== undefined && arrivalGlobal !== null && arrivalGlobal !== undefined) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 3).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        let flightToken = window.sessionStorage.getItem("flightToken");
        return fetch(envUrl.flightsUrl + departureGlobal + '/' + arrivalGlobal + '/' + today + '?directFlights=true',
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + flightToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }, departure, arrival
        )
            .then((response) => response.json())
            .then((flights) => dispatch(addFlights(flights)))
            .catch((err) => {isFailed = true})
            .finally(() => {
                console.log(isFailed);
                if (window.sessionStorage.getItem("flightToken") === null || isFailed) {
                    isFailed =false;
                    //fetchToken();
                }
                dispatch(fetchFlights(null, null));
            });
    }
};

/*Fetch Lufthansa's token if security token get expired*/

const fetchToken = () => {
    axios({
        method: 'post',
        url: envUrl.tokenUrl,
        data: qs.stringify({
            client_id: 'k64rzwbzzqpjhh2judvfjjdv',
            client_secret: 'wwyPekJR4T',
            grant_type: 'client_credentials'
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Accept': 'application/json'
        }
    })
        .then(response => response)
        .then(token => {
            window.sessionStorage.setItem("flightToken", token.data.access_token);
        })
        .catch(err => console.log(err.message));
}

/*Fetch passanger details and store it in redux storage*/

export const addPassangers = (passangers) => ({
    type: ActionTypes.ADD_Passangers,
    payload: passangers
});

export const fetchPassangers = () => (dispatch) => {
        return fetch(envUrl.baseUrl + 'usertbl',
            {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }
        )
            .then(response => response.json())
            .then(passangers => dispatch(addPassangers(passangers)))
            .catch((err) => err);
};

/*insert check in passanger in json server*/

export const checkedInSeat = (checkedInData, isUserCheckInOnce, id) => (dispatch) => {
    if (checkedInData !== null && checkedInData !== undefined && !isUserCheckInOnce) {
        return fetch(envUrl.baseUrl + 'checkin',
            {
                method: 'post',
                body: JSON.stringify(checkedInData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        )
            .then(response => { return response })
            .catch(err => console.log(err));
    }
    if (checkedInData !== null && checkedInData !== undefined && isUserCheckInOnce) {
        return fetch(envUrl.baseUrl + 'checkin/' + id,
            {
                method: 'put',
                body: JSON.stringify(checkedInData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        )
            .then(response => { return response })
            .catch(err => console.log(err));
    }
};

/*Fetch passanger checkin details and store it in redux storage*/

export const addCheckIn = (checkIns) => ({
    type: ActionTypes.ADD_CheckIn,
    payload: checkIns
});

export const fetchCheckedInList = () => (dispatch) => {
    return fetch(envUrl.baseUrl + 'checkin',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
    )
        .then(response => response.json())
        .then(checkIns => dispatch(addCheckIn(checkIns)))
        .catch((err) => err);
}

/*delete check in passanger in json server*/

export const unCheckedSeat = (unCheckedData) => (dispatch) => {
    console.log("actioncreator")
    if (unCheckedData !== null && unCheckedData !== undefined) {
        return fetch(envUrl.baseUrl + `checkin/${unCheckedData.id}`,
            {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        )
            .then(response => { return response })
            .catch(err => console.log(err));

    }
};

/*Fetch items that are available for shpiing and store it in redux storage */

export const addShopList = (shopList) => ({
    type: ActionTypes.ADD_ShopList,
    payload: shopList
});

export const shopListPerFlight = () => (dispatch) => {
    return fetch(envUrl.baseUrl + 'Shopping',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
    )
        .then(response => response.json())
        .then(shopList => dispatch(addShopList(shopList)))
        .catch((err) => err);
}

/*Fetch count of shooped items and store it in redux storage */

export const addShoppedQuantity = (shoppedItemQuantity) => ({
    type: ActionTypes.ADD_ShoppedItemQuantity,
    payload: shoppedItemQuantity
});

export const shoppedEachQuantity = () => (dispatch) => {
    return fetch(envUrl.baseUrl + 'shoppingOrder',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
        .then(response => response.json())
        .then(shoppedItemQuantity => dispatch(addShoppedQuantity(shoppedItemQuantity)))
        .catch((err) => err);
}

/*insert or update shopped items in json-server*/

export const updateShopQuant = (id, isAddQuantity, data) => (dispatch) => {
    if(isAddQuantity) {
    return fetch(envUrl.baseUrl + 'shoppingOrder/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response })
        .catch(err => console.log(err));
} else {
    return fetch(envUrl.baseUrl + 'shoppingOrder', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response })
        .catch(err => console.log(err));  
}
}

/*Fetch items that are available for ancillary and store it in redux storage */

export const addAncillaryList = (ancillaryList) => ({
    type: ActionTypes.ADD_AncillaryList,
    payload: ancillaryList
});

export const AncillaryListPerFlight = () => (dispatch) => {
    return fetch(envUrl.baseUrl + 'Ancillary',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
    )
        .then(response => response.json())
        .then(ancillaryList => dispatch(addAncillaryList(ancillaryList)))
        .catch((err) => err);
}

/*Fetch count of anillary items each bought by user and store it in redux storage */

export const addAncillaryQuantity = (ancillaryItemQuantity) => ({
    type: ActionTypes.ADD_AncillaryItemQuantity,
    payload: ancillaryItemQuantity
});

export const AncillaryEachQuantity = () => (dispatch) => {
    return fetch(envUrl.baseUrl + 'AncillaryOrder',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
        .then(response => response.json())
        .then(ancillaryItemQuantity => dispatch(addAncillaryQuantity(ancillaryItemQuantity)))
        .catch((err) => err);
}

/*insert or update ancillary items in json-server*/

export const updateAncillaryQuant = (id, isAddQuantity, data) => (dispatch) => {

    if (isAddQuantity) {
        return fetch(envUrl.baseUrl + 'AncillaryOrder/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response })
            .catch(err => console.log(err));
    } else {
        return fetch(envUrl.baseUrl + 'AncillaryOrder', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response })
            .catch(err => console.log(err));
    }
}

export const addFoodList = (foodList) => ({
    type: ActionTypes.ADD_FoodList,
    payload: foodList
});

export const FoodListPerFlight = () => (dispatch) => {
    console.log('plain method is called')
    return fetch(envUrl.baseUrl + 'Food',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
    )
        .then(response => response.json())
        .then(foodList => dispatch(addFoodList(foodList)));
}

export const addFoodQuantity = (foodItemQuantity) => ({
    type: ActionTypes.ADD_FoodItemQuantity,
    payload: foodItemQuantity
});

export const FoodEachQuantity = () => (dispatch) => {
    return fetch(envUrl.baseUrl + 'FoodOrder',
        {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
        .then(response => response.json())
        .then(foodItemQuantity => dispatch(addFoodQuantity(foodItemQuantity)))
        .catch((err) => err);
}

export const updateFoodQuant = (id, isAddQuantity, data) => (dispatch) => {

    if (isAddQuantity) {
        return fetch(envUrl.baseUrl + 'FoodOrder/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response })
            .catch(err => console.log(err));
    } else {
        return fetch(envUrl.baseUrl + 'FoodOrder', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response })
            .catch(err => console.log(err));
    }
}

/* Add a passanger */

export const addPassenger = (data) => (dispatch) => {
    console.log(data)
    return fetch(envUrl.baseUrl + 'UserTbl', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response })
        .catch(err => console.log(err));  
}

/* Update a passanger */

export const updatePassanger = (id, data) => (dispatch) => {
    return fetch(envUrl.baseUrl + 'UserTbl/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response })
        .catch(err => console.log(err));
}

/* Add a service */

export const addService = (type, data) => (dispatch) => {

    return fetch(envUrl.baseUrl + type, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response })
        .catch(err => console.log(err));  
}

/* Update a service */

export const updateService = (id, type, data) => (dispatch) => {
    return fetch(envUrl.baseUrl + type + '/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response })
        .catch(err => console.log(err));
}

export const removeServiceItem= (id, type) => (dispatch) => {
    return fetch(envUrl.baseUrl + `${type}/${id}`,
    {
        method: 'delete',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
)
    .then(response => response.json())
    .then(ancillaryList => dispatch(addAncillaryList(ancillaryList)))
    .catch(err => err);
}

/* fetchStaff details for update staff details after singup */

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_Staff,
    payload: staff
});

export const fetchStaff = () => (dispatch) => {
        return fetch(envUrl.baseUrl + 'staffTbl',
            {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }
        )
            .then(response => response.json())
            .then(staff => dispatch(addStaff(staff)))
            .catch((err) => err);
};


