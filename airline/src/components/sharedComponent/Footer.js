import React from 'react';
import "../../App.css";
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-xs-2">
                        <div className="row">
                            <div className="col-md-5"></div>
                            <div className="col-md-6">
                                <h4>Links</h4>
                            </div>
                        </div>
                        <ul>
                            <li><Link to="/inflight">In-Flights</Link></li>
                            <li><Link to="/checkin">Checkin</Link></li>
                            <li><Link to="/home">Home</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-xs-5">
                        <h4>Our Address</h4>
                        <address>
                            305, Augustus Appartment<br />
                            Electronic City, Banglore<br />
                            India<br />
                            <i className="fa fa-phone fa-lg"></i>: 9861546712<br />
                            <i className="fa fa-fax fa-lg"></i>: 7612345609<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">
                                airlinemanagement@zetairways.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-xs-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2019 Zet Airways</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;