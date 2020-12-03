import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = { // set default value for state components
      products: data.products,
      size:"",
      sort:"",
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    };
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item._id !== product._id))); // save cart state 
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice(); // clone copy from cartItems inside state
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) { //already exists
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count:1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // save cart state 
  }

  sortProducts = (event) =>  {
  const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) => 
        sort === "Menor"
        ? a.price > b.price ? 1: -1
        :sort === "Mayor"
        ? a.price < b.price ? 1:-1
        : a._id > b._id ? 1: -1
      )
    }));
  }

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({size: event.target.value,products:data.products});
    } else {
      this.setState ({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0)
      });
    }
  }

  createOrder = (order) => { 
    alert("Need to save order for " + order.name);
  }

  render () {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}>
              </Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart 
                cartItems={this.state.cartItems} 
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
}

export default App;
