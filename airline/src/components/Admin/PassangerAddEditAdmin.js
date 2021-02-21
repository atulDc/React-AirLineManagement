import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { addPassenger } from '../../redux/ActionCreator';
import { fetchPassangers, updatePassanger } from '../../redux/ActionCreator';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DashBoard.css';

const mapDispatchToProps = dispatch => ({
    fetchPassangers: () => { dispatch(fetchPassangers()) },
    addPassenger: (data) => { dispatch(addPassenger(data)) },
    updatePassanger: (id, data) => { dispatch(updatePassanger(id, data)) }
});

const mapStateToProps = (state) => {
    return {
        passangers: state.passangers
    };
};


class PassangerAddEditAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            mob: null,
            dob: null,
            passport: null,
            flightNo: null,
            hasInfant: null
        }
    }

    componentDidMount() {
        this.props.fetchPassangers();
    }

    myChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam == "dob") {
            val = val.replace(/\//gi, "-");
        }
        this.setState({ [nam]: val });
        switch(nam) {
            case 'name':
            this.touchedName = true;
            break;
            case 'email':
            this.touchedEmail = true;
            break;
            case 'mob':
            this.touchedmob = true;
            break;
            case 'dob':
            this.toucheddob = true;
            break;
            case 'passport':
            this.touchedPassport = true;
            break;
            case 'flightNo':
            this.touchedFlightNo = true;
            break;
            case 'hasInfant':
            this.touchedHasInfant = true;
            break;
        }
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let data = {
            name: this.state.name || this.touchedName ? this.state.name: this.props.passangers.passangers[this.props.match.params.id].name,
            email: this.state.email || this.touchedEmail ? this.state.email: this.props.passangers.passangers[this.props.match.params.id].email,
            mob: this.state.mob || this.touchedmob ? this.state.mob: this.props.passangers.passangers[this.props.match.params.id].mob,
            dob: this.state.dob || this.toucheddob ? this.state.dob: this.props.passangers.passangers[this.props.match.params.id].dob,
            pnr: null,
            passport: this.state.passport || this.touchedPassport ? this.state.passport: this.props.passangers.passangers[this.props.match.params.id].passport,
            flightNo: this.state.flightNo || this.touchedFlightNo ? this.state.flightNo: this.props.passangers.passangers[this.props.match.params.id].flightNo,
            hasInfant: this.state.hasInfant || this.touchedHasInfant? (this.state.hasInfant ? "yes": "No") : (this.props.passangers.passangers[this.props.match.params.id].hasInfant ? "yes" : "no")
        }
        if (this.props.match.params.id !== null) {
            this.props.updatePassanger(this.props.match.params.id, data);
        } else {
            this.props.addPassenger(data);
        }
        this.props.history.push("/success");
    }

    render() {
        let globalPassanger = {
            name: null,
            email: null,
            mob: null,
            dob: null,
            passport: null,
            flightNo: null,
            hasInfant: null
        };
        if (this.props.passangers !== null && this.props.passangers !== undefined &&
            this.props.passangers.passangers !== null && this.props.passangers.passangers !== undefined) {
            this.props.passangers.passangers.forEach((passanger) => {
                if(passanger.id == this.props.match.params.id){
                    globalPassanger = {
                        name: passanger.name,
                        email: passanger.email,
                        mob: passanger.mob,
                        dob: passanger.dob,
                        passport: passanger.passport,
                        flightNo: passanger.flightNo,
                        hasInfant: passanger.hasInfant
                    };
                }
            });
            return (
                <div className="conatiner verticalPad">
                    <div className="row verticalPad">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div id="passenger" className="card bg-light">
                                <div class="card-header text-dark"><h5>Add Passanger</h5></div>
                                <div class="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div class="card-title">
                                                <Form onSubmit={this.mySubmitHandler}>
                                                    <FormGroup>
                                                        <Input type="text" name="name" id="name" placeholder="Name" defaultValue={globalPassanger.name} onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="email" name="email" id="email" placeholder="Email" defaultValue={globalPassanger.email} onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="number" name="mob" id="mob" placeholder="Mobile" defaultValue={globalPassanger.mob} onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="date" name="dob" id="dob" placeholder="Date Of Birth" defaultValue={globalPassanger.dob} onChange={(this.myChange)} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="text" name="passport" id="passport" placeholder="Passport Number" defaultValue={globalPassanger.passport} onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="text" name="flightNo" id="flightNo" placeholder="Flight Number" defaultValue={globalPassanger.flightNo} onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" name="hasInfant" id="hasInfant" defaultChecked={globalPassanger.hasInfant ? true : false} onChange={this.myChange} />{' '}
                                                            <h6>Passenger Has Infant?</h6>
                                                        </Label>
                                                    </FormGroup>
                                                    <br />
                                                    <Button type="submit">Submit</Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <img src="/asset/image/loading.gif" className="animated-gif" alt="spinner" />
                    </div>
                </div>
            </div>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PassangerAddEditAdmin));