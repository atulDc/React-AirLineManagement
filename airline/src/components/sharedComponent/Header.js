import React, { Component } from 'react';
import { Navbar, Jumbotron, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./Header.css";
import "../../App.css";

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar place dark>
                        <div className="container textWhite">
                            <h3><i className="fa fa-fighter-jet"></i> Zet Airways</h3>
                            <div className="row">
                                <div className="col-md-12 colornav">
                                    <ul>
                                        <li><NavItem className="float-left navitem18">
                                            <span><i className="fa fa-sign-in"></i></span><Link to='/login'> Sign In</Link>
                                        </NavItem></li>

                                        <li><NavItem className="float-left navitem18">
                                            <span><i className="fa fa-user-circle-o"></i></span><Link to='/admin'> Admin</Link>
                                        </NavItem></li>

                                        <li><NavItem className="float-left navitem18">
                                            <span><i className="fa fa-plane"></i></span><Link to='/inflight'> In-Flights</Link>
                                        </NavItem></li>

                                        <li><NavItem className="float-left navitem18" >
                                            <span><i class="fa fa-file-text"></i></span><Link to='/checkin'> Checkin</Link>
                                        </NavItem></li>

                                        <li><NavItem className="float-left navitem18" >
                                            <span><i className="fa fa-home"></i></span><Link to='/home'> Home</Link>
                                        </NavItem></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Airline Management System</h2>
                                <p>The application includes features like check-in passengers, ancillary services, catering services and other essential features.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;