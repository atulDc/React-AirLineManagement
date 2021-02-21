import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import "./Checkin.css";
import { checkedInSeat, fetchCheckedInList, unCheckedSeat } from '../redux/ActionCreator';

const mapDispatchToProps = (dispatch) => ({
    checkedInSeat: (checkedInData, isUserCheckInOnce, primaryCheckInId) => { dispatch(checkedInSeat(checkedInData, isUserCheckInOnce, primaryCheckInId)) },
    fetchCheckedInList: () => { dispatch(fetchCheckedInList()) },
    unCheckedSeat: (unCheckedData) => { dispatch(unCheckedSeat(unCheckedData)) }
});

const mapStateToProps = (state) => {
    return {
        passangers: state.passangers,
        checkIns: state.checkIns
    };
};

class Checkin extends React.Component {
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
    }

    onSeatNumber = (e) => {
        this.setState({
            userSeatNumber: e.currentTarget.textContent,
        })
    }

    onCheckedIn = (e) => {
        let checkedInData = {
            userid: this.props.match.params.id,
            travelPk: null, // previous logic not written
            checkedInNo: this.state.userSeatNumber,
            isChange: false
        }
        this.checkUserCheckedInOnce(checkedInData);
    }

    checkUserCheckedInOnce(checkedInData) {
        let isUserCheckInOnce = false;
        let primaryCheckInId;
        this.props.checkIns.checkIns.forEach((checkedInItem) => {
            if (checkedInItem.userid === this.props.match.params.id) {
                isUserCheckInOnce = true;
                primaryCheckInId = checkedInItem.id;
            }
        });
        
        this.props.checkedInSeat(checkedInData, isUserCheckInOnce, primaryCheckInId);
        this.props.history.push(`/success/${this.props.match.params.id}`);
    }

    onUnChecked = (e) => {
        let unCheckedData = {
            id: this.globalCheckIns.id
        }
        this.props.unCheckedSeat(unCheckedData);
        this.globalCheckIns = null;
        this.setState({
            userSeatNumber: null,
        })
    }

    checkedInList() {
        this.props.fetchCheckedInList();
    }

    render() {

        let hasCheckIns = false;
        let countrow = -1;
        let seatNumber = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        this.checkedInList();
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
                    return (
                        <React.Fragment>
                            <div id="ab" class="seatNumber seatUnavailable" onClick={this.onSeatNumber}>{seatLeftName}</div>&nbsp;
                        <UncontrolledPopover target="ab" placement="left">
                                <PopoverBody><span><i class="fa fa-file-text"></i></span> <a onClick={this.onUnChecked}> Un-Check user</a></PopoverBody>
                            </UncontrolledPopover>
                        </React.Fragment>
                    );
                }
                else {
                    return (
                        <React.Fragment>
                            <div id="x" class="seatNumber" onClick={this.onSeatNumber}>{seatLeftName}</div>&nbsp;
                        <UncontrolledPopover target="x" placement="left">
                                <PopoverBody><span><i class="fa fa-file-text"></i></span> <a onClick={this.onCheckedIn}> Check-In user</a></PopoverBody>
                            </UncontrolledPopover>
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
                    return (
                        <React.Fragment>
                            <div id="b" class="seatNumber seatUnavailable" onClick={this.onSeatNumber}>{seatRightName}</div>&nbsp;
                        <UncontrolledPopover target="b" placement="left">
                                <PopoverBody><span><i class="fa fa-file-text"></i></span> <a onClick={this.onUnChecked}> Un-Check user</a></PopoverBody>
                            </UncontrolledPopover>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment>
                            <div id="y" class="seatNumber" onClick={this.onSeatNumber}>{seatRightName}</div>&nbsp;
                        <UncontrolledPopover target="y" placement="left">
                                <PopoverBody><span><i class="fa fa-file-text"></i></span> <a onClick={this.onCheckedIn}> Check-In user</a></PopoverBody>
                            </UncontrolledPopover>
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
                        <div className="col-md-3"></div>
                        <div className="col-md-6"><h3>Check-In, Un-Check or Change of seat</h3></div>
                        <div className="col-md-3"></div>
                        <br />
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className="card bg-light">
                                        {/* <Link to={`/checkin/passanger/${passanger.userid}`}> */}
                                        <div class="card-header text-dark"><h5>{this.globalPassangerDetails.name}</h5></div>
                                        <div class="card-body text-dark">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6>PNR: {this.globalPassangerDetails.name}</h6>
                                                    <h6>Passport: {this.globalPassangerDetails.passport}</h6>
                                                    <h6>Birth Date: {this.globalPassangerDetails.dob}</h6>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Mobile: {this.globalPassangerDetails.mob}</h6>
                                                    <h6>Email: {this.globalPassangerDetails.email}</h6>
                                                    <h6>Flight No: {this.globalPassangerDetails.flightNo}</h6>
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
                                        <div className="col-md-2 text-danger">EXIT</div>
                                        <div className="col-md-6"><h6>Cockpit this way</h6></div>
                                        <div className="col-md-2 text-danger">EXIT</div>
                                    </div>
                                    <br />
                                    {rows}
                                    <div className="row">
                                        <div className="col-md-2 text-danger">EXIT</div>
                                        <div className="col-md-6"></div>
                                        <div className="col-md-2 text-danger">EXIT</div>
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
                        <div className="col-md-3"></div>
                        <div className="col-md-6"><h3>Check-In, Un-Check or Change of seat</h3></div>
                        <div className="col-md-3"></div>
                    </div>
                    <br />
                </div>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkin));