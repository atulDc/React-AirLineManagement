import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { AncillaryListPerFlight, FoodListPerFlight, shopListPerFlight, addService, updateService} from '../../redux/ActionCreator';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DashBoard.css';

const mapDispatchToProps = dispatch => ({
    AncillaryListPerFlight: () => { dispatch(AncillaryListPerFlight()) },
    FoodListPerFlight: () => { dispatch(FoodListPerFlight()) },
    shopListPerFlight: () => { dispatch(shopListPerFlight()) },
    updateService: (id,type,data) => {dispatch(updateService(id,type,data))},
    addService: (type, data) => {dispatch(addService(type, data))}
});

const mapStateToProps = (state) => {
    return {
        AncillaryLists: state.AncillaryLists,
        shopLists: state.shopLists,
        FoodLists: state.FoodLists
    };
};


class ServiceAddEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flightNo: null,
            shoppedDesc: null,
            shoppedPrice: null,
            shoppedItem: null,
            AncillaryItem: null,
            AncillaryDesc: null,
            AncillaryPrice: null,
            FoodItem: null,
            FoodDesc: null,
            FoodPrice: null
        }
    }

    componentDidMount() {
        this.props.AncillaryListPerFlight();
        this.props.FoodListPerFlight();
        this.props.shopListPerFlight();
    }

    myChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({ [nam]: val });
        switch(nam) {
            case 'flightNo':
            this.touchedFlightNo =true;
            break;
            case 'AncillaryItem':
            this.touchedAnciName = true;
            break;
            case 'AncillaryDesc':
            this.touchedAnciDesc = true;
            break;
            case 'AncillaryPrice':
            this.touchedAnciPrice = true;
            break;
            case 'FoodItem':
            this.touchedFoodName = true;
            break;
            case 'FoodDesc':
            this.touchedFoodDesc = true;
            break;
            case 'FoodPrice':
            this.touchedFoodPrice = true;
            break;
            case 'shoppedItem':
            this.touchedShopName = true;
            break;
            case 'shoppedDesc':
            this.touchedShopDesc = true;
            break;
            case 'shoppedPrice':
            this.touchedShopPrice = true;
            break;
        }
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let data;
        let type;
        if (event.currentTarget.textContent == 'Add Ancillary') {
            type = 'Ancillary';
            data = {
                AncillaryItem: this.state.AncillaryItem || this.touchedAnciName ? this.state.AncillaryItem: this.props.AncillaryLists.AncillaryLists[this.props.match.params.id].AncillaryItem,
                AncillaryDesc: this.state.AncillaryDesc || this.touchedAnciDesc ? this.state.AncillaryDesc: this.props.AncillaryLists.AncillaryLists[this.props.match.params.id].AncillaryDesc,
                AncillaryPrice: this.state.AncillaryPrice || this.touchedAnciPrice ? this.state.AncillaryPrice: this.props.AncillaryLists.AncillaryLists[this.props.match.params.id].AncillaryPrice,
                flightNo: this.state.flightNo || this.touchedFlightNo ? this.state.flightNo: this.props.AncillaryLists.AncillaryLists[this.props.match.params.id].flightNo
            }
        } 
        else if (event.currentTarget.textContent == 'Add Food') {
            type = 'Food';
            data = {
                FoodItem: this.state.FoodItem || this.touchedFoodName ? this.state.FoodItem: this.props.FoodLists.FoodLists[this.props.match.params.id].FoodItem,
                FoodDesc: this.state.FoodDesc || this.touchedFoodDesc ? this.state.FoodDesc: this.props.FoodLists.FoodLists[this.props.match.params.id].FoodDesc,
                FoodPrice: this.state.FoodPrice || this.touchedFoodPrice ? this.state.FoodPrice: this.props.FoodLists.FoodLists[this.props.match.params.id].FoodPrice,
                flightNo: this.state.flightNo || this.touchedFlightNo ? this.state.flightNo: this.props.FoodLists.FoodLists[this.props.match.params.id].flightNo
            }
        } else {
            type = 'shopping';
            data = {
                shoppedItem: this.state.shoppedItem || this.touchedShopName ? this.state.shoppedItem: this.props.shopLists.shopLists[this.props.match.params.id].shoppedItem,
                shoppedDesc: this.state.shoppedDesc || this.touchedShopDesc ? this.state.shoppedDesc: this.props.shopLists.shopLists[this.props.match.params.id].shoppedDesc,
                shoppedPrice: this.state.shoppedPrice || this.touchedShopPrice ? this.state.shoppedPrice: this.props.shopLists.shopLists[this.props.match.params.id].shoppedPrice,
                flightNo: this.state.flightNo || this.touchedFlightNo ? this.state.flightNo: this.props.shopLists.shopLists[this.props.match.params.id].flightNo
            }
        }
        
        if (this.props.match.params.id != null) {
            this.props.updateService(this.props.match.params.id, type, data);
        } else {
            console.log('x')
            this.props.addService(type, data);
        }
        this.props.history.push("/success");
    }

    globalServiceInput(item, desc, price, flightNo, itemName, itemDesc, itemPrice, flight, type) {

        return (
            
            <div className="conatiner verticalPad">
                <div className="row verticalPad">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div id="passenger" className="card bg-light">
                            <div class="card-header text-dark"><h5>Add {type}</h5></div>
                            <div class="card-body text-dark">
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        <div class="card-title">
                                            <Form onSubmit={this.mySubmitHandler}>
                                                <FormGroup>
                                                    <Input type="text" name={itemName} id={itemName} placeholder="Name" defaultValue={item} onChange={this.myChange} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="text" name={itemDesc} id={itemDesc} placeholder="Description" defaultValue={desc} onChange={this.myChange} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="number" name={itemPrice} id={itemPrice} placeholder="Price" defaultValue={price} onChange={this.myChange} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="text" name={flight} id={flight} placeholder="Flight Number" defaultValue={flightNo} onChange={this.myChange} />
                                                </FormGroup>
                                                <br />
                                                <Button type="submit">Add {type}</Button>
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

    render() {

        let globalService = {
            flightNo: null,
            shoppedDesc: null,
            shoppedPrice: null,
            shoppedItem: null,
            AncillaryItem: null,
            AncillaryDesc: null,
            AncillaryPrice: null,
            FoodItem: null,
            FoodDesc: null,
            FoodPrice: null
        };

        if (this.props.isAncillary && this.props.AncillaryLists !== null && this.props.AncillaryLists !== undefined) {
            let ancillaryTemp={
                AncillaryItem:  null,
                AncillaryDesc: null,
                AncillaryPrice: null,
                flightNo: null
            };
            this.props.AncillaryLists.AncillaryLists.forEach((ancillary) => {
                if (ancillary.flightNo == this.props.match.params.flightno && ancillary.id == this.props.match.params.id) {
                    ancillaryTemp = {
                        AncillaryItem:  ancillary.AncillaryItem,
                        AncillaryDesc: ancillary.AncillaryDesc,
                        AncillaryPrice: ancillary.AncillaryPrice,
                        flightNo: ancillary.flightNo
                    }
                }
            });
            return (
                this.globalServiceInput(ancillaryTemp.AncillaryItem, ancillaryTemp.AncillaryDesc, ancillaryTemp.AncillaryPrice, ancillaryTemp.flightNo, 'AncillaryItem', 'AncillaryDesc', 'AncillaryPrice', 'flightNo', 'Ancillary')
            );
        }
        else if (this.props.isFood && this.props.FoodLists !== null && this.props.FoodLists !== undefined) {
            let foodTemp={
                foodItem:  null,
                foodDesc: null,
                foodPrice: null,
                flightNo: null
            };
            this.props.FoodLists.FoodLists.forEach((food) => {
                if (food.flightNo == this.props.match.params.flightno && food.id == this.props.match.params.id) {
                     foodTemp={
                        foodItem:  food.foodItem,
                        foodDesc: food.foodDesc,
                        foodPrice: food.foodPrice,
                        flightNo: food.flightNo
                    };
                }
            });
            return this.globalServiceInput(foodTemp.FoodItem, foodTemp.FoodDesc, foodTemp.FoodPrice, foodTemp.flightNo, 'FoodItem', 'FoodDesc', 'FoodPrice', 'flightNo', 'Food');
        }
        else if (this.props.isShop && this.props.shopLists !== null && this.props.shopLists !== undefined) {
            let shopTemp={
                shopItem:  null,
                shopDesc: null,
                shopPrice: null,
                flightNo: null
            };
            this.props.shopLists.shopLists.forEach((shop) => {
                if (shop.flightNo == this.props.match.params.flightno && shop.id == this.props.match.params.id ) {
                     shopTemp={
                        shopItem:  shop.shoppedItem,
                        shopDesc: shop.shoppedDesc,
                        shopPrice: shop.shoppedPrice,
                        flightNo: shop.flightNo
                    };
                }
            });
            return this.globalServiceInput(shopTemp.shoppedItem, shopTemp.shoppedDesc, shopTemp.shoppedPrice, shopTemp.flightNo, 'shoppedItem', 'shoppedDesc', 'flightNo', 'Item');
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceAddEdit));