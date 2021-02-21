import React, { Component } from 'react';
import Header from './sharedComponent/Header';
import Footer from './sharedComponent/Footer';
import Home from './Home';
import Flights from './Flights';
import { shopListPerFlight, shoppedEachQuantity, updateShopQuant, incQuantity, isGetQuantity } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';

const mapDispatchToProps = dispatch => ({
    shopListPerFlight: (flightNo) => { dispatch(shopListPerFlight()) },
    shoppedEachQuantity: () => { dispatch(shoppedEachQuantity()) },
    updateShopQuant: (id, isAddQuantity,data) => {dispatch(updateShopQuant(id, isAddQuantity, data))}
});

const mapStateToProps = (state) => {
    return {
        shopLists: state.shopLists,
        shoppedItemQuantity: state.shoppedItemQuantity       
    };
};

class Shop extends React.Component {
static quantity= [];
static isShowOne = true;

    constructor(props) {
        super(props);
        this.state = {
            quantityState: false
        }
    }

    componentDidMount() {
        this.props.shoppedEachQuantity();
        this.props.shopListPerFlight();
        console.log(this.props.history);
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
            let item = {id: count++, shoppedQuantity: quantItem}
            itemArr.push(item);
        });
        let data = {userid: parseInt(this.props.match.params.id), shoppedArr: itemArr};
        this.props.shoppedItemQuantity.shoppedItemQuantity.forEach((shoppedQuantItem) => {
            if(shoppedQuantItem.userid == this.props.match.params.id){
                isAddQuantity = true;
                this.shoppedItemId = shoppedQuantItem.id;
            }
        });
        this.props.updateShopQuant(this.shoopedItemId, isAddQuantity, data);
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
        this.props.removeServiceItem(id,'shopping');
        this.props.history.push(`/success/`);
    }

    getQuantity() {
        let countShopList = 0;
        if(!this.isGetQuantity) {
            let quantity = 0;
            if (this.props.shopLists !== null && this.props.shopLists !== undefined
                && this.props.shoppedItemQuantity !== undefined && this.props.shoppedItemQuantity !== null) {

                let shopListAll = this.props.shopLists.shopLists.map((shopListsItem) => {
                    countShopList = countShopList +1;
                    if (shopListsItem.flightNo == this.props.match.params.flightno) {
                        if (this.props.shoppedItemQuantity.ShoppedItemQuantity !== undefined && this.props.shoppedItemQuantity.ShoppedItemQuantity !== null) {

                            this.props.shoppedItemQuantity.ShoppedItemQuantity.forEach((shoppedItem) => {
                                if (shoppedItem.userid == this.props.match.params.id) {
                                    this.customerId = shoppedItem.userid;
                                    this.shoopedItemId = shoppedItem.id;
                                    shoppedItem.shoppedArr.forEach((shoppedArrItem) => {
                                        if (shoppedArrItem.id == shopListsItem.id) {
                                            quantity = shoppedArrItem.shoppedQuantity;
                                            if (Shop.quantity[shoppedArrItem.id] !== undefined && Shop.quantity[shoppedArrItem.id] !== null) {
                                                Shop.quantity[shoppedArrItem.id] = quantity;
                                            } else {
                                                Shop.quantity.push(quantity);
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
            for(let i = 0; i<countShopList; i++) {
                this.incQuantity.push(0);
            }
            this.incQuantity = Shop.quantity;
            
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
        let hasShopList = false;
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
        if (this.props.shopLists !== null && this.props.shopLists !== undefined
            && this.props.shoppedItemQuantity !== undefined && this.props.shoppedItemQuantity !== null) {
            let shopListAll = this.props.shopLists.shopLists.map((shopListsItem) => {
                if (shopListsItem.flightNo == this.props.match.params.flightno) {
                    hasShopList = true;
                    let c = count++;
                    return (
                        <React.Fragment>
                            <br />
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <Link to={`/admin/shopList/flights/${this.props.match.params.flightno}/editShopDetails/${shopListsItem.id}`}>
                                            <div class="card-header text-dark"><h5> {shopListsItem.shoppedItem} </h5></div>
                                        </Link>
                                        <div class="card-body text-dark">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-12"><p> {shopListsItem.shoppedDesc} </p></div>
                                                        <div className="col-md-2">
                                                        <h5><span class="badge badge-success"> ₹ {shopListsItem.shoppedPrice} </span></h5>
                                                        </div>
                                                        <div className="col-md-4 pt-md-1">                         
                                                            {quantityBtn(c,shopListsItem.id)}
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
                            <h3>Shopping</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {shopListAll}
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
        if (!hasShopList) {
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Shopping</h3>
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
                            <h3>Shopping</h3>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shop));
