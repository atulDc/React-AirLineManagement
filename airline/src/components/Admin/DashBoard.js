import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import './DashBoard.css';


class DashBoard extends React.Component {

    onAddPassanger() {
        this.props.history.push(`/admin/addPassanger`);
    }

    onListAllPassanger() {
        this.props.history.push(`/admin/passangers`);
    }

    
    onAddAncillary() {
        this.props.history.push(`/admin/addAncillary`);
    }

    
    onAddFood() {
        this.props.history.push(`/admin/addFood`);
    }

    
    onAddShop() {
        this.props.history.push(`/admin/addShop`);
    }

    serviceListFlight(servicetype) {
        this.props.history.push(`/admin/${servicetype}/flights`);
    }

    render() {
        return (
            <div className="conatiner verticalPad">
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-2">
                        <h4>Admin Dashboard</h4>
                    </div>
                </div>
                <div className="row verticalPad">
                <div className="col-md-2"></div>
                    <div className="col-md-2">
                        <div id="passenger" className="card bg-light">
                            <div class="card-header text-dark"><h5>Passanger</h5></div>
                            <div class="card-body text-dark">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h1 class="card-title iconFontAdmin">
                                        <i class="fa fa-group"></i>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <UncontrolledPopover className="customPopOver" target="passenger" placement="top">
                            <PopoverBody>
                                <div className="row">
                                    <div className="col-md-12"><h6><span><i class="fa fa-user-plus"></i></span><a onClick={() => this.onAddPassanger()}> Add Passanger</a></h6></div>
                                    <div className="col-md-12"><h6><span><i class="fa fa-vcard"></i></span><a onClick={() => this.onListAllPassanger()}> Check Passanger List</a></h6></div>
                                </div>
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    <div className="col-md-2">
                        <div id="ancillary" className="card bg-light">
                            <div class="card-header text-dark"><h5>Ancillary</h5></div>
                            <div class="card-body text-dark">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 class="card-title iconFontAdmin">
                                        <i class="fa fa-wheelchair-alt"></i>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        </div>
                        <UncontrolledPopover className="customPopOver" target="ancillary" placement="top">
                            <PopoverBody>
                                <div className="row">
                                    <div className="col-md-12"><h6><span><i class="fa fa-wheelchair"></i></span><a onClick={() => this.onAddAncillary()}> Add Ancillary Item</a></h6></div>
                                    <div className="col-md-12"><h6><span><i class="fa fa-suitcase"></i></span><a onClick={() => this.serviceListFlight('ancillaryList')}> Check Ancillary List Per Flight</a></h6></div>
                                </div>
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    <div className="col-md-2">
                        <div id="foodx" className="card bg-light">
                            <div class="card-header text-dark"><h5>Food</h5></div>
                            <div class="card-body text-dark">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 class="card-title iconFontAdmin">
                                            <i class="fa fa-cutlery"></i>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <UncontrolledPopover className="customPopOver" target="foodx" placement="top">
                            <PopoverBody>
                                <div className="row">
                                    <div className="col-md-12"><h6><span><i class="fa fa-cutlery"></i></span><a onClick={() => this.onAddFood()}> Add Food Item</a></h6></div>
                                    <div className="col-md-12"><h6><span><i class="fa fa-cutlery"></i></span><a onClick={() => this.serviceListFlight('foodList')}> Check Food List Per Flight</a></h6></div>
                                </div>
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    <div className="col-md-2">
                        <div id ="shop" className="card bg-light">
                            <div class="card-header text-dark"><h5>Shop</h5></div>
                            <div class="card-body text-dark">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 class="card-title iconFontAdmin">
                                        <i class="fa fa-shopping-cart"></i>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        </div>
                        <UncontrolledPopover className="customPopOver" target="shop" placement="top">
                            <PopoverBody>
                                <div className="row">
                                    <div className="col-md-12"><h6><span><i class="fa fa-shopping-cart"></i></span><a onClick={() => this.onAddShop()}> Add Shop Item</a></h6></div>
                                    <div className="col-md-12"><h6><span><i class="fa fa-shopping-cart"></i></span><a onClick={() => this.shopListFlight('shopList')}> Check Shop List Per Flight</a></h6></div>
                                </div>
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="verticalPad"></div>
            </div>
        );
    }
}
export default withRouter((DashBoard));