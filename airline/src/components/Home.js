import React, { Component } from 'react';
import {Card, CardText, CardBody, CardTitle} from 'reactstrap';
import "./Home.css"

class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-2">
                        <br/>
                    <h3>Our Services</h3>
                    </div>
                    <div className="col-md-5"></div>
                </div>
                <div className="row pady">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-1 font30 font-violet">
                                <i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                            <div className="col-md-10">
                                <Card>
                                    <CardBody >
                                        <CardTitle>
                                            <h4>Check-in</h4>
                                        </CardTitle>
                                        <CardText>Check-in option is offered, with passengers asked if they prefer a window or an aisle seat.</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-1 font30 font-violet">
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                            </div>
                            <div className="col-md-10">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <h4>In-flight</h4>
                                        </CardTitle>
                                        <CardText>In-flight option is offered, with passengers asked during journey if they need any thing.</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-1 font30 font-violet">
                            <i class="fa fa-shopping-cart"></i>
                            </div>
                            <div className="col-md-10">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <h4>Ancillary Service</h4>
                                        </CardTitle>
                                        <CardText>Ancillary service is offered, like wheel chair,  shopping and etc.</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-1 font30 font-violet">
                            <i class="fa fa-cutlery" aria-hidden="true"></i>
                            </div>
                            <div className="col-md-10">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <h4>Catering Service</h4>
                                        </CardTitle>
                                        <CardText>Meals are prepared by specialist airline catering services.</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;