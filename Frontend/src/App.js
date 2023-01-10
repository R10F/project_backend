import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import productList from "./productList";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SingleCatalog from "./components/SingleCatalog";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: productList,
      cartItems: [],
      cartQty: 0,
      cartTotal: 0,
      appliedCode: false,
    };
  }
  payment = () => {
    let newcart = [];
    this.setState((state) => ({
      cartQty: 0,
      cartTotal: 0,
      cartItems: newcart,
      appliedCode: false,
    }));
  };
  update = (index, inc) => {
    this.setState((state) => ({
      cartQty: state.cartQty + inc,
      cartTotal: state.cartTotal + state.cartItems[index].harga * inc,
    }));
  };

  addToCart = (id, increment) => {
    let index = this.state.cartItems.findIndex((cartitem) => cartitem.id === id);
    let inc = parseInt(increment, 10);

    if (index === -1) {
      let product = this.getProduct(parseInt(id, 10));
      let hargaproduk;
      if (product.isSales) {
        hargaproduk = product.salePrice;
      } else {
        hargaproduk = product.harga;
      }
      let addedProduct = {
        id: product.id,
        src: product.src,
        nama: product.nama,
        harga: hargaproduk,
        beforeSale: product.harga,
        qty: 1,
      };
      index = this.state.cartItems.length;
      this.setState({ cartItems: [...this.state.cartItems, addedProduct] });
    } else {
      let updatedCart = this.state.cartItems;
      updatedCart[index].qty += inc;

      this.setState({ cartItems: updatedCart });
    }
    this.update(index, inc);
  };

  deleteFromCart = (id) => {
    const index = this.state.cartItems.findIndex((cartitem) => cartitem.id === id);
    const qty = this.state.cartQty - this.state.cartItems[index].qty;
    const total = this.state.cartTotal - this.state.cartItems[index].harga * this.state.cartItems[index].qty;
    let remainingCart = this.state.cartItems;
    remainingCart.splice(index, 1);

    this.setState(() => ({
      cartItems: remainingCart,
      cartQty: qty,
      cartTotal: total,
    }));
  };

  getProduct = (id) => {
    return this.state.products.find((product) => product.id === id);
  };

  applyCode = (valid) => {
    this.setState({ appliedCode: valid });
  };
  editProduct = (id, updatedProduct) => {
    let productList = this.state.products;
    const index = productList.findIndex((product) => product.id === id);

    productList[index]["nama"] = updatedProduct["name"];
    productList[index]["harga"] = updatedProduct["price"];
    productList[index]["isSales"] = updatedProduct["isSales"];
    productList[index]["salePrice"] = updatedProduct["salePrice"];

    this.setState({ products: productList });
  };

  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout inCart={this.state.cartQty} />}>
          <Route index element={<Home products={this.state.products} addToCart={this.addToCart} />} />
          <Route path="/catalog" element={<Catalog products={this.state.products} addToCart={this.addToCart} />} />
          <Route path="/catalog/:productId" element={<SingleCatalog getProduct={this.getProduct} addToCart={this.addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                addToCart={this.addToCart}
                deleteFromCart={this.deleteFromCart}
                applyCode={this.applyCode}
                cartItems={this.state.cartItems}
                cartQty={this.state.cartQty}
                cartTotal={this.state.cartTotal}
                appliedCode={this.state.appliedCode}
                payment={this.payment}
              />
            }
          />
        </Route>

        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard products={this.state.products} editProduct={this.editProduct} />} />
      </Routes>
    );
  }

  componentWillMount() {
    localStorage.getItem("laptopu") && this.setState(JSON.parse(localStorage.getItem("laptopu")));
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("laptopu", JSON.stringify(nextState));
  }
}

export default App;
