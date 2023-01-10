import React from "react";
import Product from "../components/Product";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.products = this.props.products;
  }

  render() {
    let allproduct = this.products.map((product) => {
      return (
        <Product productDetail={product} key={product.id}>
          <button
            className="btn btn-outline-dark"
            onClick={() => {
              this.props.addToCart(product.id, 1);
            }}
          >
            Add to Cart
          </button>
        </Product>
      );
    });
    return (
      <main className="container py-5">
        <div className="row">
          <h1>Catalog</h1>
          <div className="row">{allproduct}</div>
        </div>
      </main>
    );
  }
}
export default Catalog;
