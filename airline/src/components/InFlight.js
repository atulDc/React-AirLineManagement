import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import "./Checkin.css";
import { checkedInSeat, fetchCheckedInList, unCheckedSeat } from '../redux/ActionCreator';
import { AncillaryListPerFlight, AncillaryEachQuantity} from '../redux/ActionCreator';
import { shopListPerFlight, shoppedEachQuantity } from '../redux/ActionCreator';
import { FoodListPerFlight, FoodEachQuantity} from '../redux/ActionCreator';

const mapDispatchToProps = (dispatch) => ({
    checkedInSeat: (checkedInData) => { dispatch(checkedInSeat(checkedInData)) },
    fetchCheckedInList: () => { dispatch(fetchCheckedInList()) },
    unCheckedSeat: (unCheckedData) => { dispatch(unCheckedSeat(unCheckedData)) },
    AncillaryListPerFlight: (flightNo) => { dispatch(AncillaryListPerFlight()) },
    AncillaryEachQuantity: () => { dispatch(AncillaryEachQuantity()) },
    shopListPerFlight: (flightNo) => { dispatch(shopListPerFlight()) },
    shoppedEachQuantity: () => { dispatch(shoppedEachQuantity()) },
    FoodListPerFlight: (flightNo) => { dispatch(FoodListPerFlight()) },
    FoodEachQuantity: () => { dispatch(FoodEachQuantity()) }
});

const mapStateToProps = (state) => {
    return {
        passangers: state.passangers,
        checkIns: state.checkIns,
        shopLists: state.shopLists,
        shoppedItemQuantity: state.shoppedItemQuantity,
        FoodLists: state.FoodLists,
        FoodItemQuantity: state.FoodItemQuantity,  
        AncillaryLists: state.AncillaryLists,
        AncillaryItemQuantity: state.AncillaryItemQuantity 
    };
};

class InFlight extends React.Component {
    globalPassangerDetails = null;
    globalCheckIns = null;
    constructor(props) {
        super(props);
        this.state = {
            userSeatNumber: null,
            userAlphabet: null
        }
    }

    rowArray = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    seatLeftArray = [undefined, undefined];
    seatRightArray = [undefined, undefined, undefined];

    componentDidMount() {
        this.props.shopListPerFlight();
        this.props.shoppedEachQuantity();
        this.props.FoodListPerFlight();
        this.props.FoodEachQuantity();
        this.props.AncillaryListPerFlight();
        this.props.AncillaryEachQuantity();
        this.checkedInList();
    }

    onSeatNumber = (e) => {
        this.setState({
            userSeatNumber: e.currentTarget.textContent,
        })
    }

    ancillaryService = () => {
        this.props.history.push(`/inflight/${this.props.match.params.flightno}/passanger/ancillary/${this.props.match.params.id}`);
    }

    onShopping = () =>{
        this.props.history.push(`/inflight/${this.props.match.params.flightno}/passanger/shop/${this.props.match.params.id}`);
    }

    onShopping = () =>{
        this.props.history.push(`/inflight/${this.props.match.params.flightno}/passanger/food/${this.props.match.params.id}`);
    }

    onClickFood = () =>{
        this.props.history.push(`/inflight/${this.props.match.params.flightno}/passanger/food/${this.props.match.params.id}`);
    }

    checkedInList() {
        this.props.fetchCheckedInList();
    }

    passangerList() {
        this.props.history.goBack();
    }

    userAncillaryServices(userid) {
        let userAncillaryItem = [];
        let eachItemArr = [];
        let userOptedWheelChair = false;
        if (this.props.AncillaryLists != null && this.props.AncillaryLists !== undefined && this.props.AncillaryLists.AncillaryLists !== null && this.props.AncillaryLists.AncillaryLists !== undefined &&
            this.props.AncillaryItemQuantity != null && this.props.AncillaryItemQuantity !== undefined && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== null && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== undefined) {
            this.props.AncillaryLists.AncillaryLists.forEach((ancillaryItem) => {
                if (ancillaryItem.flightNo == this.props.match.params.flightno) {
                    this.props.AncillaryItemQuantity.AncillaryItemQuantity.forEach((quantItem) => {
                        if (quantItem.userid == userid) {
                            quantItem.AncillaryArr.forEach((quant) => {
                                if (quant.id == ancillaryItem.id) {
                                    if(ancillaryItem.AncillaryItem == "Wheel Chair" && quant.AncillaryQuantity>0){
                                        userOptedWheelChair =true;
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
        return eachItemArr.map((arrItem) => {
            return (
                <div className="row">
                    <div className="col-md-8">{arrItem.ancillaryItemName}: </div>
                    <div className="col-md-2">{arrItem.ancillaryItemQuantity}</div>
                </div>
            );
        });
    }

    

    userShoppedServices(userid) {
        let eachItemArr = [];
        if (this.props.shopLists != null && this.props.shopLists !== undefined && this.props.shopLists.shopLists !== null && this.props.shopLists.shopLists !== undefined &&
            this.props.shoppedItemQuantity != null && this.props.shoppedItemQuantity !== undefined && this.props.shoppedItemQuantity.ShoppedItemQuantity !== null && this.props.shoppedItemQuantity.ShoppedItemQuantity !== undefined) {
            this.props.shopLists.shopLists.forEach((shopItem) => {
                if (shopItem.flightNo == this.props.match.params.flightno) {
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

    userFoodServices(userid) {
        let eachItemArr = [];
        if (this.props.FoodLists != null && this.props.FoodLists !== undefined && this.props.FoodLists.FoodLists !== null && this.props.FoodLists.FoodLists !== undefined &&
            this.props.FoodItemQuantity != null && this.props.FoodItemQuantity !== undefined && this.props.FoodItemQuantity.FoodItemQuantity !== null && this.props.FoodItemQuantity.FoodItemQuantity !== undefined) {
            this.props.FoodLists.FoodLists.forEach((foodItem) => {
                if (foodItem.flightNo == this.props.match.params.flightno) {
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

    render() {
        let hasCheckIns = false;
        let countrow = -1;
        let seatNumber = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let arrSeats = [];
        if (this.props.checkIns !== null && this.props.checkIns !== undefined
            && this.props.checkIns.checkIns !== null && this.props.checkIns.checkIns !== undefined) {
            this.props.checkIns.checkIns.forEach((checkedInItems) => {
                arrSeats.push(checkedInItems.checkedInNo);
            });
        }

        if (this.props.passangers !== null && this.props.passangers !== undefined) {

            let passangerDetail;

            this.props.passangers.passangers.forEach(function (passanger) {
                if (passanger.id == this.props.match.params.id) {
                    passangerDetail = passanger;
                    this.globalPassangerDetails = passanger;
                }
            }, this);

            if (this.props.checkIns !== null && this.props.checkIns !== undefined) {
                this.props.checkIns.checkIns.forEach((checkInsItem) => {
                    if (this.globalPassangerDetails.id.toString() === checkInsItem.userid.toString()) {
                        hasCheckIns = true;
                        this.globalCheckIns = checkInsItem;
                    }
                }, this);
            }

            if (!hasCheckIns) {
                this.globalCheckIns = null;
            }
        }

        const seatsLeft = (alphabet, countleft) => {
            return this.seatLeftArray.map(() => {
                countleft = countleft + 1;
                let seatLeftName = (countleft + alphabet);
                if ((arrSeats.includes(seatLeftName)) && !(this.globalCheckIns !== null && this.globalCheckIns !== undefined && seatLeftName === this.globalCheckIns.checkedInNo)) {
                    return (
                        <React.Fragment>
                            <div class="seatNumber bg-danger">{seatLeftName}</div>&nbsp;
                        </React.Fragment>
                    );
                }
                if (this.globalCheckIns !== null && this.globalCheckIns !== undefined && seatLeftName === this.globalCheckIns.checkedInNo) {
                    return ( //un-check portion
                        <React.Fragment>
                            <div id="ab" class="seatNumber seatUnavailable" onClick={this.onSeatNumber}>{seatLeftName}</div>&nbsp;
                        <UncontrolledPopover target="ab" placement="left">
                                <PopoverBody>
                                <div className="row">
                                    <div className="col-md-12"><h6><span><i class="fa fa-shopping-cart"></i></span><a onClick={this.onShopping}> Shop</a></h6></div>
                                    <div className="col-md-12"><h6><span><i class="fa fa-cutlery"></i></span><a onClick={this.onShopping}> Food</a></h6></div>
                                </div>
                                </PopoverBody>
                            </UncontrolledPopover>
                        </React.Fragment>
                    );
                }
                else { //check portion
                    return (
                        <React.Fragment>
                            <div id="x" class="seatNumber" onClick={this.onSeatNumber}>{seatLeftName}</div>&nbsp;
                        </React.Fragment>
                    );
                }
            });
        }

        const seatsRight = (alphabet, countright) => {
            return this.seatRightArray.map(() => {
                countright = countright + 1;
                let seatRightName = countright + alphabet;
                if ((arrSeats.includes(seatRightName)) && !(this.globalCheckIns !== null && this.globalCheckIns !== undefined && seatRightName === this.globalCheckIns.checkedInNo)) {
                    return (
                        <React.Fragment>
                            <div class="seatNumber bg-danger">{seatRightName}</div>&nbsp;
                        </React.Fragment>
                    );
                }
                if (this.globalCheckIns !== null && this.globalCheckIns !== undefined && seatRightName === this.globalCheckIns.checkedInNo) {
                    return ( //un-check portion
                        <React.Fragment>
                            <div id="b" class="seatNumber seatUnavailable" onClick={this.onSeatNumber}>{seatRightName}</div>&nbsp;
                        <UncontrolledPopover target="b" placement="left">
                        <PopoverBody>
                        <div className="row">
                            <div className="col-md-12"><h6><span><i class="fa fa-wheelchair-alt"></i></span><a onClick={this.ancillaryService}> Ancillary</a></h6></div>
                            <div className="col-md-12"><h6><span><i class="fa fa-shopping-cart"></i></span><a onClick={this.onShopping}> Shop</a></h6></div>
                            <div className="col-md-12"><h6><span><i class="fa fa-cutlery"></i></span><a onClick={this.onFood}> Food</a></h6></div>
                        </div>
                    </PopoverBody>
                            </UncontrolledPopover>
                        </React.Fragment>
                    );
                } else {
                    return ( // check portion
                        <React.Fragment>
                            <div id="y" class="seatNumber" onClick={this.onSeatNumber}>{seatRightName}</div>&nbsp;
                        </React.Fragment>
                    );
                }
            });
        }

        const rows = this.rowArray.map(() => {
            let countleft = 0;
            let countright = 2
            countrow = countrow + 1;
            return (
                <React.Fragment>
                    <div class="row">
                        <div className="col-md-1"><h6>{seatNumber[countrow]}</h6></div>
                        <div className="col-md-3">
                            {seatsLeft(seatNumber[countrow], countleft)}
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-3">
                            {seatsRight(seatNumber[countrow], countright)}
                        </div>
                    </div>
                    <br />
                </React.Fragment>
            );
        });

        if (this.globalPassangerDetails !== null && this.globalPassangerDetails !== undefined) {

            return (
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"><h3>InFlight and Ancillary</h3></div>
                        <div className="col-md-4">
                            <div  className="col-md-4"></div>
                            <div className="col-md-8 text-primary" onClick={() => {this.passangerList()}} >
                            <h6><i class="fa fa-angle-left"></i> Back to passanger list</h6>
                            </div>
                        </div>
                        <br />
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card bg-light">
                                        {/* <Link to={`/checkin/passanger/${passanger.userid}`}> */}
                                        <div class="card-header text-dark"><h5>{this.globalPassangerDetails.name}</h5></div>
                                        <div class="card-body text-dark">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <h6>PNR: {this.globalPassangerDetails.name}</h6>
                                                    <h6>Passport: {this.globalPassangerDetails.passport}</h6>
                                                    <h6>Birth Date: {this.globalPassangerDetails.dob}</h6>
                                                </div>
                                                <div className="col-md-5">
                                                    <h6>Mobile: {this.globalPassangerDetails.mob}</h6>
                                                    <h6>Email: {this.globalPassangerDetails.email}</h6>
                                                    <h6>Flight No: {this.globalPassangerDetails.flightNo}</h6>
                                                </div>
                                                <div className="col-md-3">                                               
                                                <h6 id = "server1">Ancillary Obtained</h6>
                                                    <UncontrolledPopover target="server1" placement="left">
                                                        <PopoverBody>
                                                            {this.userAncillaryServices(this.props.match.params.id)}
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                    <h6 id="server2" >Shopped Products</h6>
                                                    <UncontrolledPopover target="server2" placement="left">
                                                        <PopoverBody>
                                                            {this.userShoppedServices(this.props.match.params.id)}
                                                        </PopoverBody>
                                                    </UncontrolledPopover> 
                                                    <h6 id="server3" >Meals/Snacks</h6>
                                                    <UncontrolledPopover target="server3" placement="left">
                                                        <PopoverBody>
                                                            {this.userFoodServices(this.props.match.params.id)}
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <div className="col-md-12"></div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-4"></div>
                                                        <h6 className="text-primary"><a onClick={this.ancillaryService}> <u>Click to add Ancillary Service</u></a></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="seatSelection col-md-12">
                                <div className="col-md-2"></div>
                                <div class="seatsChart col-md-8">
                                    <div className="row">
                                        <div className="col-md-1 text-danger">EXIT</div>
                                        <div className="col-md-9"><h6>Cockpit this way</h6></div>
                                        <div className="col-md-1 text-danger">EXIT</div>
                                    </div>
                                    <br />
                                    {rows}
                                    <div className="row">
                                        <div className="col-md-1 text-danger">EXIT</div>
                                        <div className="col-md-9"></div>
                                        <div className="col-md-1 text-danger">EXIT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <br />
                </div>
            );
        } else {
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"><h3>InFlight and Ancillary</h3></div>
                        <div className="col-md-4">
                        <div  className="col-md-4"></div>
                        <div className="col-md-8 text-primary" onClick={() => {this.passangerList()}} >
                        <h6><i class="fa fa-angle-left"></i> Back to passanger list</h6>
                        </div>
                        </div>
                    </div>
                    <br />
                </div>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InFlight));