import React from "react";
import { Link } from "react-router-dom";

class SalesProduct extends React.Component {
  addToCart = () => {
    this.props.addToCart(this.props.product.id, 1);
  };

  render() {
    let harga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.product.harga);
    let salesPrice = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.product.salePrice);

    return (
      <div className="col mb-5" data-aos="flip-right" data-aos-duration="2500">
        <div className="card h-100">
          <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>
            Sale
          </div>

          <img className="card-img-top" src={this.props.product.src} alt="card" />

          <div className="card-body p-4">
            <div className="text-center">
              <Link to={`/catalog/${this.props.product.id}`} className="text-decoration-none text-dark">
                <h5 className="fw-bolder">{this.props.product.nama}</h5>
              </Link>
              <span className="fs-5 text-danger">{salesPrice}</span>
              <br />
              <span className="text-muted text-decoration-line-through">
                <small>{harga}</small>
              </span>
            </div>
          </div>

          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button className="btn btn-outline-dark mt-auto add" onClick={this.addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesProduct;
