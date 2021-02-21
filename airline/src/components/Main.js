import React, { Component } from 'react';
import Header from './sharedComponent/Header';
import Footer from './sharedComponent/Footer';
import Home from './Home';
import Flights from './Flights';
import Success from './Success';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Passanger from './Passanger';
import Checkin from './Checkin';
import InFlight from './InFlight';
import Login from './sharedComponent/Login';
import Shop from './Shop';
import Ancillary from './Ancillary';
import Food from './Food';
import DashBoard from './Admin/DashBoard'
import PassangerAddEditAdmin from './Admin/PassangerAddEditAdmin';
import ServiceAddEdit from './Admin/ServiceAddEdit';


class Main extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={() => <Home />} />
                    <Route path='/login' component={() => <Login/>} />
                    <Route path='/signup' component={() => <Login isSignUp={true}/>} />
                    <Route exact path='/checkin' component={() => <Flights isCheckin={true} />} />
                    <Route exact path='/inflight' component={() => <Flights isCheckin={false} />} />
                    <Route exact path='/checkin/:id' component={() => <Passanger isCheckinPassangers={true} />} />
                    <Route exact path='/inflight/:id' component={() => <Passanger isCheckinPassangers={false} />} />
                    <Route exact path='/checkin/:flightno/passanger/:id' component={() => <Checkin/>} />
                    <Route exact path='/inflight/:flightno/passanger/:id' component={() => <InFlight/>} />
                    <Route exact path='/inflight/:flightno/passanger/ancillary/:id' component={() => <Ancillary/>} />
                    <Route exact path='/inflight/:flightno/passanger/shop/:id' component={() => <Shop/>} />
                    <Route exact path='/inflight/:flightno/passanger/food/:id' component={() => <Food/>} />
                    <Route exact path='/admin' component={() => <DashBoard/>} />
                    <Route exact path='/admin/addPassanger' component={() => <PassangerAddEditAdmin/>} />
                    <Route exact path='/admin/editPassanger/:id' component={() => <PassangerAddEditAdmin/>} />
                    <Route exact path='/admin/addAncillary' component={() => <ServiceAddEdit isAncillary={true}/>} />
                    <Route exact path='/admin/addFood' component={() => <ServiceAddEdit isFood={true}/>} />
                    <Route exact path='/admin/addShoppingItem' component={() => <ServiceAddEdit isShop={true}/>} />
                    <Route exact path='/admin/passangers' component={() => <Passanger/>}/>
                    <Route exact path='/admin/ancillaryList/flights' component={() => <Flights/>} />
                    <Route exact path='/admin/foodList/flights' component={() => <Flights/>} />
                    <Route exact path='/admin/shopList/flights' component={() => <Flights/>} />
                    <Route exact path='/admin/ancillaryList/flights/:flightno' component={() => <Ancillary isAdmin={true}/>} />
                    <Route exact path='/admin/foodList/flights/:flightno' component={() => <Shop isAdmin={true}/>} />
                    <Route exact path='/admin/shopList/flights/:flightno' component={() => <Food isAdmin={true}/>} />
                    <Route exact path='/admin/ancillaryList/flights/:flightno/editAncillary/:id' component={() => <ServiceAddEdit isAncillary={true}/>} />
                    <Route exact path='/admin/foodList/flights/:flightno/editFood/:id' component={() => <ServiceAddEdit isFood={true}/>} />
                    <Route exact path='/admin/shopList/flights/:flightno/editShopDetails/:id' component={() => <ServiceAddEdit isShop={true}/>} />
                    <Route exact path='/passangers' component={() => <Passanger/>}/>
                    <Route  path='/success' component={() => <Success/>} />
                    <Route  path='/success/:id' component={() => <Success/>} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
