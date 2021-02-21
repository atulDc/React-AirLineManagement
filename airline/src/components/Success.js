import React, { Component } from 'react';
import './Flight.css';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import "./Success.css";

const mapStateToProps = (state) => {
    return {
        passangers: state.passangers
    };
};


class Success extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let passangersCheckedIn;
        if(this.props.match.params.id != null && this.props.match.params.id !== undefined){
        if (this.props.passangers !== null && this.props.passangers !== undefined) {
            this.props.passangers.passangers.forEach(function (passanger) {
                if (passanger.id == this.props.match.params.id) {
                    passangersCheckedIn = passanger;
                }
            }, this);

            

            return (
                <React.Fragment>
                    <br/>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10 text-success">
                            <h5>Successfully submitted for {passangersCheckedIn.name} in flight number : {passangersCheckedIn.flightNo}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <h6 to="/home"><span className="customAnchor">Go back to : </span></h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <Link to="/home"><i className="fa fa-home"></i><span > Home</span></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <Link to="/checkin"><i class="fa fa-file-text"></i><span > Check-In</span></Link>
                        </div>
                    </div>
                    <br/>
                </React.Fragment>
            );
        } else {
            return (
            <Redirect to="/home"></Redirect>
        );
        }
    } else {
        return (
            <React.Fragment>
            <br/>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10 text-success">
                    <h5>Successfully submitted.</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <h6 to="/home"><span className="customAnchor">Go back to : </span></h6>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <Link  to="/home"><i className="fa fa-home successLink"></i><span> Home</span></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <Link to="/checkin"><i class="fa fa-file-text"></i><span> Check-In</span></Link>
                </div>
            </div>
            <br/>
        </React.Fragment>
        );
    }

    }
}


//export default Flights;
export default withRouter(connect(mapStateToProps)(Success));