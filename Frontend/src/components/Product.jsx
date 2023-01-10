import React from "react";
import { Link } from "react-router-dom";
import Star from "./Star";
import Aos from "aos";
import "aos/dist/aos.css";

class Product extends React.Component {
  render() {
    Aos.init({
      once: true,
    });
    let harga;
    this.props.productDetail.isSales
      ? (harga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.productDetail.salePrice))
      : (harga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.productDetail.harga));

    return (
      <div className="col-md-3 my-2">
        <article className="card mb-4 product-wap rounded-0 h-100" data-aos="flip-right" data-aos-duration="2000" data-aos-once="true">
          <img className="card-img rounded-0 img-fluid" src={this.props.productDetail.src} alt={this.props.productDetail.name} />
          <div className="card-body">
            <Link to={`/catalog/${this.props.productDetail.id}`} className="text-decoration-none text-dark">
              <h2 className="fs-5">{this.props.productDetail.nama}</h2>
            </Link>
            <div className=" d-flex justify-content-start mb-1">
              <Star rating={this.props.productDetail.rating} />
            </div>

            <p className={this.props.productDetail.isSales ? "mb-0 text-danger" : "mb-0"}>{harga}</p>
            {this.props.productDetail.isSales ? <span className="badge text-light bg-red py-2">On Sale</span> : ""}
          </div>
          <div className="card-footer d-flex justify-content-end">{this.props.children}</div>
        </article>
      </div>
    );
  }
}

export default Product;
