import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import {removeFromCart} from '../actions/cartActions';
import {createOrder, clearOrder} from '../actions/orderActions';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {showCheckout: false,
        name: "",
        email: "",
        address: ""}; // by default do not show checkout 
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((total,item) => total + item.price*item.count, 0)
        };
        this.props.createOrder(order);
    }

    closeModal = () => {
        this.props.clearOrder();
    }

    render() {
        const {cartItems, order} = this.props; // get cartItems and order from App.js
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">No ha cargado productos</div> 
                : <div className="cart cart-header">Tiene {cartItems.length} en el carrito</div>}
                {
                    order && (
                        <Modal 
                            isOpen={true}
                            onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="order-details">
                                    <h3 className="success-message">Su orden ha sido registrada</h3>
                                    <h2>Orden {order._id}</h2>
                                    <ul>
                                        <li>
                                            <div>Nombre:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Dirección:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Fecha:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div>{formatCurrency(order.total)}</div>
                                        </li>
                                        <li>
                                            <div>Artículos:</div>
                                            <div>
                                                {order.cartItems.map((x) => (
                                                <div>{x.count} {" x "} {x.title}</div>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                    </Modal>
                    ) 
                }
                
                <div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count} {" "}
                                            <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {formatCurrency(cartItems.reduce((a,c) => a + c.price * c.count, 
                                0))}
                            </div>
                            <button className="button-primary" onClick={() => {this.setState({showCheckout: true});}}>
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                    {
                        this.state.showCheckout && (
                            <Fade right cascade>
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input name="email" type="email" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Nombre</label>
                                                    <input name="name" type="text" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Dirección</label>
                                                    <input name="address" type="text" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button type="submit" className="button-primary">COMPRAR</button>
                                                </li>
                                            </ul>
                                    </form>
                                </div>
                            </Fade>
                        )
                    }
                    </div>
                )}
                </div>
            </div> 
        )
    }
}

export default connect((state)=> ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
    }), {
        removeFromCart,
        createOrder, 
        clearOrder,
    }
) (Cart);