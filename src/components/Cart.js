import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import {removeFromCart} from '../actions/cartActions';

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
        };
        this.props.createOrder(order);
    }

    render() {
        const {cartItems} = this.props; // get cartItems from App.js
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">No ha cargado productos</div> 
                : <div className="cart cart-header">Tiene {cartItems.length} en el carrito</div>}
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
    cartItems: state.cart.cartItems,
    }), {
        removeFromCart,
    }
) (Cart);