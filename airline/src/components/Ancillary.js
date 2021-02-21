import React, { Component } from 'react';
import Header from './sharedComponent/Header';
import Footer from './sharedComponent/Footer';
import Home from './Home';
import Flights from './Flights';
import { AncillaryListPerFlight, AncillaryEachQuantity, updateAncillaryQuant, incQuantity, isGetQuantity, removeServiceItem } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';

const mapDispatchToProps = dispatch => ({
    AncillaryListPerFlight: (flightNo) => { dispatch(AncillaryListPerFlight()) },
    AncillaryEachQuantity: () => { dispatch(AncillaryEachQuantity()) },
    updateAncillaryQuant: (id, isAddQuantity, data) => {dispatch(updateAncillaryQuant(id, isAddQuantity, data))},
    removeServiceItem: (id,type) => {dispatch(removeServiceItem(id,type))}
});

const mapStateToProps = (state) => {
    return {
        AncillaryLists: state.AncillaryLists,
        AncillaryItemQuantity: state.AncillaryItemQuantity       
    };
};

class Ancillary extends React.Component {
static quantity= [];
static isShowOne = true;

    constructor(props) {
        super(props);
        this.state = {
            quantityState: false
        }
    }

    componentDidMount() {
        this.props.AncillaryEachQuantity();
        this.props.AncillaryListPerFlight();
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
            let item = {id: count++, AncillaryQuantity: quantItem}
            itemArr.push(item);
        });
        let data = {userid: parseInt(this.props.match.params.id), AncillaryArr: itemArr};
        this.props.AncillaryItemQuantity.AncillaryItemQuantity.forEach((ancillaryQuantItem) => {
            if(ancillaryQuantItem.userid == this.props.match.params.id){
                isAddQuantity = true;
                this.shoppedItemId = ancillaryQuantItem.id;
            }
        });
       this.props.updateAncillaryQuant(this.shoopedItemId, isAddQuantity, data);
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
        this.props.removeServiceItem(id,'Ancillary');
        this.props.history.push(`/success/`);
    }

    getQuantity() {
        let countAncillaryList = 0;
        if(!this.isGetQuantity) {
            let quantity = 0;
            if (this.props.AncillaryLists !== null && this.props.AncillaryLists !== undefined && this.props.AncillaryLists.AncillaryLists !== undefined && this.props.AncillaryLists.AncillaryLists !== null
                && this.props.AncillaryItemQuantity !== undefined && this.props.AncillaryItemQuantity !== null && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== undefined && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== null) {

                let AncillaryListAll = this.props.AncillaryLists.AncillaryLists.map((AncillaryListsItem) => {
                    countAncillaryList = countAncillaryList +1;
                    if (AncillaryListsItem.flightNo == this.props.match.params.flightno) {
                        if (this.props.AncillaryItemQuantity.AncillaryItemQuantity !== undefined && this.props.AncillaryItemQuantity.AncillaryItemQuantity !== null) {

                            this.props.AncillaryItemQuantity.AncillaryItemQuantity.forEach((AncillaryItem) => {
                                if (AncillaryItem.userid == this.props.match.params.id) {
                                    this.customerId = AncillaryItem.userid;
                                    this.shoopedItemId = AncillaryItem.id;
                                    AncillaryItem.AncillaryArr.forEach((AncillaryArrItem) => {
                                        if (AncillaryArrItem.id == AncillaryListsItem.id) {
                                            quantity = AncillaryArrItem.AncillaryQuantity;
                                            if (Ancillary.quantity[AncillaryArrItem.id] !== undefined && Ancillary.quantity[AncillaryArrItem.id] !== null) {
                                                Ancillary.quantity[AncillaryArrItem.id] = quantity;
                                            } else {
                                                Ancillary.quantity.push(quantity);
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
            for(let i = 0; i<countAncillaryList; i++) {
                this.incQuantity.push(0);
            }
            this.incQuantity = Ancillary.quantity;
            
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
        let hasAncillaryList = false;
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
        if (this.props.AncillaryLists !== null && this.props.AncillaryLists !== undefined
            && this.props.AncillaryItemQuantity !== undefined && this.props.AncillaryItemQuantity !== null) {
            let AncillaryListAll = this.props.AncillaryLists.AncillaryLists.map((AncillaryListsItem) => {
                if (AncillaryListsItem.flightNo == this.props.match.params.flightno) {
                    hasAncillaryList = true;
                    let c = count++;
                    return (
                        <React.Fragment>
                            <br />
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <Link to={`/admin/ancillaryList/flights/${this.props.match.params.flightno}/editAncillary/${AncillaryListsItem.id}`}>
                                        <div class="card-header text-dark"><h5> {AncillaryListsItem.AncillaryItem} </h5></div>
                                        </Link>
                                        <div class="card-body text-dark">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-12"><p> {AncillaryListsItem.AncillaryDesc} </p></div>
                                                        <div className="col-md-2">                  
                                                            <h5><span class="badge badge-success"> ₹ {AncillaryListsItem.AncillaryPrice} </span></h5>
                                                        </div>
                                                        <div className="col-md-4 pt-md-1">
                                                        {quantityBtn(c, AncillaryListsItem.id)}
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
                            <h3>Ancillary Services</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {AncillaryListAll}
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
        if (!hasAncillaryList) {
            return (
                <div className="conatiner">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Ancillary Services</h3>
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
                            <h3>Ancillaryping</h3>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ancillary));
