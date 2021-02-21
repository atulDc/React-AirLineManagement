import React, { Component } from 'react';
import Header from './sharedComponent/Header';
import Footer from './sharedComponent/Footer';
import Home from './Home';
import Flights from './Flights';
import { filterTypes, adminFilterTypes } from './sharedComponent/Locations';
import { fetchPassangers, fetchCheckedInList } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { AncillaryListPerFlight, AncillaryEachQuantity } from '../redux/ActionCreator';
import { shopListPerFlight, shoppedEachQuantity } from '../redux/ActionCreator';
import { FoodListPerFlight, FoodEachQuantity } from '../redux/ActionCreator';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const mapDispatchToProps = dispatch => ({
    fetchPassangers: () => { dispatch(fetchPassangers()) },
    fetchCheckedInList: () => { dispatch(fetchCheckedInList()) },
    AncillaryListPerFlight: (flightNo) => { dispatch(AncillaryListPerFlight()) },
    AncillaryEachQuantity: () => { dispatch(AncillaryEachQuantity()) },
    shopListPerFlight: (flightNo) => { dispatch(shopListPerFlight()) },
    shoppedEachQuantity: () => { dispatch(shoppedEachQuantity()) },
    FoodListPerFlight: (flightNo) => { dispatch(FoodListPerFlight()) },
    FoodEachQuantity: () => { dispatch(FoodEachQuantity()) }
});

const mapStateToProps = (state) => {
    return {
        shopLists: state.shopLists,
        shoppedItemQuantity: state.shoppedItemQuantity,
        FoodLists: state.FoodLists,
        FoodItemQuantity: state.FoodItemQuantity,
        passangers: state.passangers,
        checkIns: state.checkIns,
        AncillaryLists: state.AncillaryLists,
        AncillaryItemQuantity: state.AncillaryItemQuantity
    };
};

class Passanger extends React.Component {
    filterPassanger = "Remove Filter";
    constructor(props) {
        super(props);
        this.state = {
            isOpenToggle: false,
            initialValue: 'Remove Filter',
            isLoading: false
        }
    }

    componentDidMount() {
        this.props.shopListPerFlight();
        this.props.shoppedEachQuantity();
        this.props.FoodListPerFlight();
        this.props.FoodEachQuantity();
        this.props.fetchPassangers();
        this.props.fetchCheckedInList();
        this.props.AncillaryListPerFlight();
        this.props.AncillaryEachQuantity();
        this.isLoaded = true;
    }

    userAncillaryServices(userid, flightNo, isFilter) {
        let userAncillaryItem = [];
        let eachItemArr = [];
        let userOptedWheelChair = false;
        if (this.props.AncillaryLists != null && this.props.AncillaryLists !== undefined && this.props.AncillaryLists.AncillaryLists !== null && this.props.AncillaryLists.AncillaryLists !== undefined &&
            this.props.AncillaryItemQuantity != null && this.props.AncillaryItemQuantity !== undefined && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== null && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== undefined) {
            this.props.AncillaryLists.AncillaryLists.forEach((ancillaryItem) => {
                if (ancillaryItem.flightNo == flightNo) {
                    this.props.AncillaryItemQuantity.AncillaryItemQuantity.forEach((quantItem) => {
                        if (quantItem.userid == userid) {
                            quantItem.AncillaryArr.forEach((quant) => {
                                if (quant.id == ancillaryItem.id) {
                                    if (ancillaryItem.AncillaryItem == "Wheel Chair" && quant.AncillaryQuantity > 0) {
                                        userOptedWheelChair = true;
                                    }
                                    const item = {
                                        ancillaryItemName: ancillaryItem.AncillaryItem,
                                        ancillaryItemQuantity: quant.AncillaryQuantity
                                    }
                                    eachItemArr.push(item);
                                }
                            });
                        }
                    });
                }
            });
        }
        if (isFilter && userOptedWheelChair) {
            return true;
        }
        else if (isFilter && !userOptedWheelChair) {
            return false;
        } else {
            if (eachItemArr !== null && eachItemArr !== undefined && eachItemArr.length > 0) {
                return eachItemArr.map((arrItem) => {
                    return (
                        <div className="row">
                            <div className="col-md-8">{arrItem.ancillaryItemName}: </div>
                            <div className="col-md-2">{arrItem.ancillaryItemQuantity}</div>
                        </div>
                    );
                });
            }
            if (eachItemArr.length == 0) {
                return (<div>
                    <p>No Item Found!</p>
                </div>);
            }
        }
    }

    userShoppedServices(userid, flightNo) {
        let eachItemArr = [];
        if (this.props.shopLists != null && this.props.shopLists !== undefined && this.props.shopLists.shopLists !== null && this.props.shopLists.shopLists !== undefined &&
            this.props.shoppedItemQuantity != null && this.props.shoppedItemQuantity !== undefined && this.props.shoppedItemQuantity.ShoppedItemQuantity !== null && this.props.shoppedItemQuantity.ShoppedItemQuantity !== undefined) {
            this.props.shopLists.shopLists.forEach((shopItem) => {
                if (shopItem.flightNo == flightNo) {
                    this.props.shoppedItemQuantity.ShoppedItemQuantity.forEach((quantItem) => {
                        if (quantItem.userid == userid) {
                            quantItem.shoppedArr.forEach((quant) => {
                                if (quant.id == shopItem.id) {
                                    const item = {
                                        shoppedItemName: shopItem.shoppedItem,
                                        shoppedItemQuantity: quant.shoppedQuantity
                                    }
                                    eachItemArr.push(item);
                                }
                            });
                        }
                    });
                }
            });
        }

        if (eachItemArr !== null && eachItemArr !== undefined && eachItemArr.length > 0) {
            return eachItemArr.map((arrItem) => {
                return (
                    <div className="row">
                        <div className="col-md-8">{arrItem.shoppedItemName}: </div>
                        <div className="col-md-2">{arrItem.shoppedItemQuantity}</div>
                    </div>
                );
            });
        }
        if (eachItemArr.length == 0) {
            return (<div>
                <p>No Item Found!</p>
            </div>);
        }
    }

    userFoodServices(userid, flightNo) {
        let eachItemArr = [];
        if (this.props.FoodLists != null && this.props.FoodLists !== undefined && this.props.FoodLists.FoodLists !== null && this.props.FoodLists.FoodLists !== undefined &&
            this.props.FoodItemQuantity != null && this.props.FoodItemQuantity !== undefined && this.props.FoodItemQuantity.FoodItemQuantity !== null && this.props.FoodItemQuantity.FoodItemQuantity !== undefined) {
            this.props.FoodLists.FoodLists.forEach((foodItem) => {
                if (foodItem.flightNo == flightNo) {
                    this.props.FoodItemQuantity.FoodItemQuantity.forEach((quantItem) => {
                        if (quantItem.userid == userid) {
                            quantItem.FoodArr.forEach((quant) => {
                                if (quant.id == foodItem.id) {
                                    const item = {
                                        foodItemName: foodItem.FoodItem,
                                        foodItemQuantity: quant.FoodQuantity
                                    }
                                    eachItemArr.push(item);
                                }
                            });
                        }
                    });
                }
            });
        }

        if (eachItemArr !== null && eachItemArr !== undefined && eachItemArr.length > 0) {
            return eachItemArr.map((arrItem) => {
                return (
                    <div className="row">
                        <div className="col-md-8">{arrItem.foodItemName}: </div>
                        <div className="col-md-2">{arrItem.foodItemQuantity}</div>
                    </div>
                );
            });
        }
        if (eachItemArr.length == 0) {
            return (<div>
                <p>No Item Found!</p>
            </div>);
        }
    }


    handleClickFilter = (e) => {
        this.filterPassanger = e.currentTarget.textContent;
        this.setState({
            initialValue: e.currentTarget.textContent,
            isOpenToggle: false
        })
    }

    render() {

        let detailsCheckInOrInFlight;
        if (this.props.isCheckinPassangers) {
            detailsCheckInOrInFlight = `/checkin/${this.props.match.params.id}/passanger/`;
        } else {
            detailsCheckInOrInFlight = `/inflight/${this.props.match.params.id}/passanger/`;
        }

        const filters = filterTypes.map((filterItem) => {
            return (
                <DropdownItem header>
                    <div onClick={this.handleClickFilter}>{filterItem}</div>
                </DropdownItem>
            );
        });

        const adminFilters = adminFilterTypes.map((adminFilterItem) => {
            return (
                <DropdownItem header>
                    <div onClick={this.handleClickFilter}>{adminFilterItem}</div>
                </DropdownItem>
            );
        });

        const dropDownPassanger = () => {
            if (this.props.match.params.id != null && this.props.match.params.id !== undefined) {
                return (
                    <Dropdown isOpen={this.state.isOpenToggle} toggle={() => { this.setState({ isOpenToggle: !(this.state.isOpenToggle) }) }}>
                        <DropdownToggle caret>
                            {this.state.initialValue}
                        </DropdownToggle>
                        <DropdownMenu>
                            {filters}
                        </DropdownMenu>
                    </Dropdown>
                );
            } else {
                return (
                    <Dropdown isOpen={this.state.isOpenToggle} toggle={() => { this.setState({ isOpenToggle: !(this.state.isOpenToggle) }) }}>
                        <DropdownToggle caret>
                            {this.state.initialValue}
                        </DropdownToggle>
                        <DropdownMenu>
                            {adminFilters}
                        </DropdownMenu>
                    </Dropdown>
                );
            }
        }

        const headerName = (id, name) => {
            if (this.props.match.params.id != null) {
                return (
                    <Link to={`${detailsCheckInOrInFlight}${id}`}>
                        <div class="card-header text-dark"><h5>{name}</h5></div>
                    </Link>
                );
            } else {
                let editPassanger = `/admin/editPassanger/`;
                return (
                    <Link to={`${editPassanger}${id}`}>
                        <div class="card-header text-dark"><h5>{name}</h5></div>
                    </Link>
                );
            }
        }

        let passangersInFlight;
        if (this.isLoaded && this.props.passangers !== null && this.props.passangers !== undefined &&
            this.props.AncillaryLists != null && this.props.AncillaryLists !== undefined && this.props.AncillaryLists.AncillaryLists !== null && this.props.AncillaryLists.AncillaryLists !== undefined &&
            this.props.AncillaryItemQuantity != null && this.props.AncillaryItemQuantity !== undefined && 
            this.props.AncillaryItemQuantity.AncillaryItemQuantity !== null && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== undefined) {
                console.log(this.props.passangers.passangers)
            let count = 0;
            passangersInFlight = this.props.passangers.passangers.map((passanger) => {
                let userSeatNumber;
                if (this.props.checkIns !== null && this.props.checkIns !== undefined
                    && this.props.checkIns.checkIns !== null && this.props.checkIns.checkIns !== undefined) {
                    this.props.checkIns.checkIns.forEach((checkedInItem) => {
                        if (checkedInItem.userid == passanger.id) {
                            userSeatNumber = checkedInItem.checkedInNo;
                        }
                    })
                }
                if (passanger.flightNo === this.props.match.params.id || (this.props.match.params.id == null)) {
                    if ((this.filterPassanger == 'Remove Filter' && (userSeatNumber !== null || userSeatNumber === null))
                        || (this.filterPassanger == 'Checked-In' && userSeatNumber != null)
                        || (this.filterPassanger == 'Not Checked-In' && userSeatNumber == null)
                        || (this.filterPassanger == 'Infant' && passanger.hasInfant == "yes")
                        || (this.filterPassanger == 'Wheel Chair' && this.userAncillaryServices(passanger.id, true))
                        || (this.filterPassanger == 'Mobile' && (passanger.mob === ''))
                        || (this.filterPassanger == 'Date of Birth' && passanger.dob === ''
                            || (this.filterPassanger == 'passport' && passanger.passport === ''))) {
                        let c = (count++).toString();
                        c = "s" + c;
                        let d = "t" + c;
                        let e = "u" + c;
                        return (
                            <div className="col-md-12">
                                <br />
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        <div className="card bg-light">
                                            {headerName(passanger.id, passanger.name)}
                                            <div class="card-body text-dark">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h6>PNR: {passanger.name}</h6>
                                                        <h6>Passport: {passanger.passport}</h6>
                                                        <h6>Birth Date: {passanger.dob}</h6>
                                                        <h6>Has Inflat: {passanger.hasInfant} </h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6>Mobile: {passanger.mob}</h6>
                                                        <h6>Email: {passanger.email}</h6>
                                                        <h6>Flight No: {passanger.flightNo}</h6>
                                                        <h6>Seat No: {userSeatNumber}</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div>
                                                            <h6 id={d} >Shopped Products</h6>
                                                            <UncontrolledPopover target={d} placement="left">
                                                                <PopoverBody>
                                                                    {this.userShoppedServices(passanger.id, passanger.flightNo)}
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                        <div>
                                                            <h6 id={c} >Ancillary Services</h6>
                                                            <UncontrolledPopover target={c} placement="left">
                                                                <PopoverBody>
                                                                    {this.userAncillaryServices(passanger.id, passanger.flightNo, false)}
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                        <div>
                                                            <h6 id={e} >Food (Meals/Snacks)</h6>
                                                            <UncontrolledPopover target={e} placement="left">
                                                                <PopoverBody>
                                                                    {this.userFoodServices(passanger.id, passanger.flightNo)}
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                </div>
                            </div>


                        );
                    }
                }
            });
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Passangers</h3>
                        </div>
                        <div className="col-md-5">
                            <div className='col-md-8'></div>
                            <div className='col-md-8'>
                                {dropDownPassanger()}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {passangersInFlight}
                    </div>
                    <br />
                </div>
            );
        }
        else {
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Passangers</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-3">
                            <img src="/asset/image/loading.gif" className="animated-gif" alt="spinner" />
                            <div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <br />
                </div>
            )
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Passanger));
