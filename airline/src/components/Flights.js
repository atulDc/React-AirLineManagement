import React, { Component } from 'react';
import { Jumbotron, ButtonToolbar, Button } from 'reactstrap';
import './Flight.css';
import { locations } from './sharedComponent/Locations';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFlights } from '../redux/ActionCreator';

const mapDispatchToProps = dispatch => ({
    fetchFlights: (departure, arrival) => { dispatch(fetchFlights(departure, arrival)) }
});

const mapStateToProps = (state) => {
    return {
        flights: state.flights
    };
};

class Flights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownArrival: false,
            dorodownDeparture: false,
            departureLocation: 'Departure',
            arrivalLocation: 'Arrival',
            isLoading: false
        }
    }

    handleClickDeparture = (e) => {
        this.setState({
            departureLocation: e.currentTarget.textContent,
            dropdownDeparture: false
        })
    }

    handleClickArrival = (e) => {
        this.setState({
            arrivalLocation: e.currentTarget.textContent,
            dropdownArrival: false
        })
    }

    onFlightSearch = () => {
        this.setState({ isLoading: !(this.state.isLoading) });
        this.props.fetchFlights(this.state.departureLocation, this.state.arrivalLocation);
        this.setState({ isLoading: !(this.state.isLoading) });
    }

    loader = () => {
        if (this.state.isLoading === true) {
            return (
                <React.Fragment>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <img src="/asset/image/loading.gif" className="animated-gif" alt="spinner" />
                        <div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </React.Fragment>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {

        let redirectToPassangersList;
        if(this.props.isCheckin) {
            redirectToPassangersList = "/checkin/";
        } else {
            redirectToPassangersList = "/inflight/";
        }

        const departuresAirports = locations.Departures.map((departure) => {
            return (
                <DropdownItem header>
                    <div onClick={this.handleClickDeparture}>{departure}</div>
                </DropdownItem>
            );
        });

        const arrivalAirports = locations.Arrivals.map((arrival) => {
            return (
                <DropdownItem header>
                    <div onClick={this.handleClickArrival}>{arrival}</div>
                </DropdownItem>
            );
        });


        if (this.props.flights !== null && this.props.flights !== undefined
            && this.props.flights.flights !== null && this.props.flights.flights !== undefined &&
            this.props.flights.flights.ScheduleResource !== null && this.props.flights.flights.ScheduleResource !== undefined) {
            const flightScheduleDeatils = this.props.flights.flights.ScheduleResource.Schedule.map((flightScheduleItem) => {
                return (
                    <div className="col-md-12 margin-list">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="card bg-light">
                                    <Link to={`${redirectToPassangersList}${flightScheduleItem.Flight.MarketingCarrier.FlightNumber}`}>
                                        <div class="card-header text-dark"><h5>Airline: {flightScheduleItem.Flight.MarketingCarrier.AirlineID}</h5></div>
                                        <div class="card-body text-dark">
                                            <div className="row">
                                                <div className="col-md-6"><h6 class="card-title">Flight Number: {flightScheduleItem.Flight.MarketingCarrier.FlightNumber}</h6></div>
                                                <div className="col-md-6"><h6 class="card-title">Duration: {flightScheduleItem.TotalJourney.Duration}</h6></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5 class="card-title">Departure</h5>
                                                    <h6>Airport: {flightScheduleItem.Flight.Departure.AirportCode}</h6>
                                                    <h6>Time: {flightScheduleItem.Flight.Departure.ScheduledTimeLocal.DateTime}</h6>
                                                    <h6>Terminal: {flightScheduleItem.Flight.Departure.Terminal.Name}</h6>
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 class="card-title">Arrival</h5>
                                                    <h6>Airport: {flightScheduleItem.Flight.Arrival.AirportCode}</h6>
                                                    <h6>Time: {flightScheduleItem.Flight.Arrival.ScheduledTimeLocal.DateTime}</h6>
                                                    <h6>Terminal: {flightScheduleItem.Flight.Arrival.Terminal.Name}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>
                );
            });

            //render function return
            return (
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Our Flights</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-5"><h6>Depature Airport: </h6></div>
                                <div className="col-md-3">
                                    <Dropdown isOpen={this.state.dropdownDeparture} toggle={() => { this.setState({ dropdownDeparture: !(this.state.dropdownDeparture) }) }}>
                                        <DropdownToggle caret>
                                            {this.state.departureLocation}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {departuresAirports}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-5"><h6>Arrival Airport: </h6></div>
                                <div className="col-md-3">
                                    <Dropdown isOpen={this.state.dropdownArrival} toggle={() => { this.setState({ dropdownArrival: !(this.state.dropdownArrival) }) }}>
                                        <DropdownToggle caret>
                                            {this.state.arrivalLocation}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {arrivalAirports}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-2">
                            <ButtonToolbar>
                                <Button variant="primary" onClick={this.onFlightSearch}>
                                    <strong>Check  Flights</strong>
                                </Button>
                            </ButtonToolbar>
                        </div>
                        <br />
                    </div>
                    <div className="row">
                        {flightScheduleDeatils}
                    </div>
                </div>
            );
        }
        else {
            //render function return
            return (
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h3>Our Flights</h3>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-5"><h6>Depature Airport: </h6></div>
                                <div className="col-md-3">
                                    <Dropdown isOpen={this.state.dropdownDeparture} toggle={() => { this.setState({ dropdownDeparture: !(this.state.dropdownDeparture) }) }}>
                                        <DropdownToggle caret>
                                            {this.state.departureLocation}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {departuresAirports}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-5"><h6>Arrival Airport: </h6></div>
                                <div className="col-md-3">
                                    <Dropdown isOpen={this.state.dropdownArrival} toggle={() => { this.setState({ dropdownArrival: !(this.state.dropdownArrival) }) }}>
                                        <DropdownToggle caret>
                                            {this.state.arrivalLocation}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {arrivalAirports}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-2">
                            <ButtonToolbar>
                                <Button variant="primary" onClick={this.onFlightSearch}>
                                    <strong>Check  Flights</strong>
                                </Button>
                            </ButtonToolbar>
                        </div>
                        <br />
                    </div>
                    <div className="row">
                        {this.loader()}
                    </div>
                    <br />
                </div>
            );
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Flights));