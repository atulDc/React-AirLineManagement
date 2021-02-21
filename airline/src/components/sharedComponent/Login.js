import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { userTypes  } from './Locations';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import * as envUrl from './baseurl';
import { updateStaff } from '../../redux/ActionCreator';
import { fetchStaff, addStaff } from '../../redux/ActionCreator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            email: null,
            staffType: null,
            isOpenToggle: false,
            initialValue: '--Staff Type--'
        }
    }

    componentDidMount() {
    }

    myChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        switch (nam) {
            case 'password':
                this.touchedPassword = true;
                break;
            case 'email':
                this.touchedEmail = true;
                break;
        }
    }

    mySubmitHandler = (event) => { //done
        event.preventDefault();
        let data = {
            password: this.state.name,
            email: this.state.email,
            type: this.staffType
        }
        let x = this.loginUser(data);
        console.log(x);
        //this.props.history.push("/success");
    }

    loginUser(data) {
        return fetch(envUrl.baseUrl + 'staffTbl?email=' + data.email,
            {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }
        )
            .then(response => response.json())
            .catch((err) => err);
    }

    singUpUser() {
        console.log();
        this.props.history.push('/signup');
    }

    handleClickFilter(e) {
        console.log(e.currentTarget.textContent)
        this.setState({
            staffType: e.currentTarget.textContent,
            isOpenToggle: false
        });
    }

    render() {
        let filter;
         filter = userTypes.map((filterItem) => {
            return (
                <DropdownItem header>
                    <div onClick={this.handleClickFilter}>{filterItem}</div>
                </DropdownItem>
            );
        });
        if (!this.props.isSignUp) {
            return (
                <div className="conatiner verticalPad">
                    <div className="row verticalPad">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div id="passenger" className="card bg-light">
                                <div class="card-header text-dark"><h5>Sign In</h5></div>
                                <div class="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div class="card-title">
                                                <Form onSubmit={this.mySubmitHandler}>
                                                    <FormGroup>
                                                        <Input type="email" name="email" id="name" placeholder="Email Id" onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.myChange} />
                                                    </FormGroup>
                                                    <Button type="submit">Sign In</Button> &nbsp; <p>Dont have an account yet? <span className="text-primary" onClick={() => {this.singUpUser()}}> Sign up </span> here.</p>
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
        } 
        if(userTypes !== null && this.props.isSignUp) {
            return (
                <div className="conatiner verticalPad">
                    <div className="row verticalPad">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div id="passenger" className="card bg-light">
                                <div class="card-header text-dark"><h5>Sign Up</h5></div>
                                <div class="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div class="card-title">
                                                <Form onSubmit={this.mySubmitHandler}>
                                                    <FormGroup>
                                                        <Input type="email" name="email" id="name" placeholder="Email Id" onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.myChange} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                    <Dropdown id="staffType" isOpen={this.state.isOpenToggle} toggle={() => { this.setState({ isOpenToggle: !(this.state.isOpenToggle) }) }}>
                                                        <DropdownToggle caret>
                                                            {this.state.initialValue}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {filter}
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    </FormGroup>
                                                    <br/>
                                                    <Button type="submit">Sign Up</Button>
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
        }
    }
}


export default withRouter((Login));