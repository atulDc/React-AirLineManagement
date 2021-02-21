import React, { Component } from 'react';
import Header from './sharedComponent/Header';
import Footer from './sharedComponent/Footer';
import Home from './Home';
import Flights from './Flights';
import { FoodListPerFlight, FoodEachQuantity, updateFoodQuant, incQuantity, isGetQuantity } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';

const mapDispatchToProps = dispatch => ({
    FoodListPerFlight: (flightNo) => { dispatch(FoodListPerFlight()) },
    FoodEachQuantity: () => { dispatch(FoodEachQuantity()) },
    updateFoodQuant: (id, isAddQuantity, data) => {dispatch(updateFoodQuant(id, isAddQuantity, data))}
});

const mapStateToProps = (state) => {
    return {
        FoodLists: state.FoodLists,
        FoodItemQuantity: state.FoodItemQuantity       
    };
};

class Food extends React.Component {
static quantity= [];
static isShowOne = true;

    constructor(props) {
        super(props);
        this.state = {
            quantityState: false
        }
    }

    componentDidMount() {
        this.props.FoodListPerFlight();
        this.props.FoodEachQuantity();
    }

    componentDidUpdate() {
    }
 
    onCancel() {
        this.props.history.goBack();
    }

    onSubmit() {
        let isAddQuantity = false;
        let count = 0;
        let itemArr = [];
        this.incQuantity.forEach((quantItem) => {
            let item = {id: count++, FoodQuantity: quantItem}
            itemArr.push(item);
        });
        let data = {userid: parseInt(this.props.match.params.id), FoodArr: itemArr};
        this.props.FoodItemQuantity.FoodItemQuantity.forEach((FoodQuantItem) => {
            if(FoodQuantItem.userid == this.props.match.params.id){
                isAddQuantity = true;
                this.shoppedItemId = FoodQuantItem.id;
            }
        });
       this.props.updateFoodQuant(this.shoopedItemId, isAddQuantity, data);
        this.props.history.push(`/success/${this.props.match.params.id}`);
    }

    add(count) {
        this.incQuantity[count] = this.incQuantity[count] + 1;
        this.setState({quantityState: 1});
    }

    subtract(count) {
        this.incQuantity[count] = this.incQuantity[count] - 1;
        this.setState({quantityState: 1});
    }

    removeItem(id) {
        this.props.removeServiceItem(id,'Food');
        this.props.history.push(`/success/`);
    }

    getQuantity() {
        let countFoodList = 0;
        if(!this.isGetQuantity) {
            let quantity = 0;
            if (this.props.FoodLists !== null && this.props.FoodLists !== undefined
                && this.props.FoodItemQuantity !== undefined && this.props.FoodItemQuantity !== null) {

                let FoodListAll = this.props.FoodLists.FoodLists.map((FoodListsItem) => {
                    countFoodList = countFoodList +1;
                    if (FoodListsItem.flightNo == this.props.match.params.flightno) {
                        if (this.props.FoodItemQuantity.FoodItemQuantity !== undefined && this.props.FoodItemQuantity.FoodItemQuantity !== null) {

                            this.props.FoodItemQuantity.FoodItemQuantity.forEach((FoodItem) => {
                                if (FoodItem.userid == this.props.match.params.id) {
                                    this.customerId = FoodItem.userid;
                                    this.shoopedItemId = FoodItem.id;
                                    FoodItem.FoodArr.forEach((FoodArrItem) => {
                                        if (FoodArrItem.id == FoodListsItem.id) {
                                            quantity = FoodArrItem.FoodQuantity;
                                            if (Food.quantity[FoodArrItem.id] !== undefined && Food.quantity[FoodArrItem.id] !== null) {
                                                Food.quantity[FoodArrItem.id] = quantity;
                                            } else {
                                                Food.quantity.push(quantity);
                                                this.hasQuantity = true;
                                           }
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
            this.incQuantity = [];
            for(let i = 0; i<countFoodList; i++) {
                this.incQuantity.push(0);
            }
            this.incQuantity = Food.quantity;
            if(this.hasQuantity) {
            this.isGetQuantity = true;
            }
        }
    }

    render() {
        let detailsCheckInOrInFlight;
        if (this.props.isCheckinPassangers) {
            detailsCheckInOrInFlight = "/checkin/passanger/";
        } else {
            detailsCheckInOrInFlight = "/inflight/passanger/";
        }
        this.getQuantity();
        let hasFoodList = false;
        let count = 0; 
        const quantityBtn = (c, itemId) => {
            if (!this.props.isAdmin) {
                return (
                    <Button color="primary" outline>
                        <Badge color="secondary" onClick={() => this.add(c)}> +</Badge>
                        <strong> {this.incQuantity[c]} </strong>
                        <Badge color="secondary" onClick={() => this.subtract(c)}> -</Badge>
                    </Button>
                );
            } else {
                return (
                    <Button color="danger" outline onClick={() => this.removeItem(itemId)}> <strong>Delete</strong> </Button>
                );
            }
        }
        if (this.props.FoodLists !== null && this.props.FoodLists !== undefined
            && this.props.FoodItemQuantity !== undefined && this.props.FoodItemQuantity !== null) {
            let FoodListAll = this.props.FoodLists.FoodLists.map((FoodListsItem) => {
                if (FoodListsItem.flightNo == this.props.match.params.flightno) {
                    hasFoodList = true;
                    let c = count++;
                    return (
                        <React.Fragment>
                            <br />
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <Link to={`/admin/foodList/flights/${this.props.match.params.flightno}/editFood/${FoodListsItem.id}`}>
                                            <div class="card-header text-dark"><h5> {FoodListsItem.FoodItem} </h5></div>
                                        </Link>
                                        <div class="card-body text-dark">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-12"><p> {FoodListsItem.FoodDesc} </p></div>
                                                        <div className="col-md-4">
                                                        <h5><span class="badge badge-success"> ₹ {FoodListsItem.FoodPrice} </span></h5>
                                                        </div>
                                                        <div className="col-md-4 pt-md-1">
                                                           
                                                            {quantityBtn(c, FoodListPerFlight.id)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                }
            });

            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Food Services</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {FoodListAll}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-1">
                            <Button color="secondary" onClick={() => {this.onCancel()}} outline>
                                <strong> Cancel </strong>
                            </Button>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-1">
                            <Button color="primary" onClick={() => {this.onSubmit()}} outline>
                                <strong> Submit </strong>
                            </Button>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <br />

                </div>
            );
        }
        if (!hasFoodList) {
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Food Services</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 secondary">
                            <h5>Sorry for the inconviniance. No content!</h5>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <br />
                </div>
            );
        } else {
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Foodping</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 secondary">
                            <img src="/asset/image/loading.gif" className="animated-gif" alt="spinner" />
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <br />
                </div>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Food));
