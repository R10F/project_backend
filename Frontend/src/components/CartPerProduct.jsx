import React from "react";
import Swal from "sweetalert2";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

class CartPerProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: this.props.productDetail.qty,
    };
  }
  handlechange = () => {
    let newQty = this.props.productDetail.qty;
    this.setState({ qty: newQty });
  };
  handleinput = (e) => {
    let newQty = e.target.value;
    if (newQty <= 0 && newQty !== "") return;
    if (newQty === "") newQty = 0;
    this.setState({ qty: e.target.value });
    this.props.addToCart(this.props.productDetail.id, newQty - this.props.productDetail.qty);
  };
  deleteFromCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "This product has been deleted from your cart.", "success");

        this.props.deleteFromCart(this.props.productDetail.id);
      }
    });
  };

  render() {
    let harga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.productDetail.harga * this.props.productDetail.qty);
    return (
      <section className="card rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-2">
              <img src={this.props.productDetail.src} className="img-fluid rounded-3" alt={this.props.productDetail.nama} />
            </div>
            <div className="col-md-3">
              <Link to={`/catalog/${this.props.productDetail.id}`} className="text-decoration-none text-dark">
                <p className="lead fw-normal mb-2">{this.props.productDetail.nama}</p>
              </Link>
            </div>

            <div className="col-md-2 d-flex align-items-center my-2">
              <div className="d-flex flex-column">
                <label htmlFor="quantity" className={this.state.qty ? "d-none" : "text-danger form-label"}>
                  Please enter positive value
                </label>
                <div className="d-flex">
                  <button
                    className="btn btn-link px-2"
                    disabled={this.state.qty <= 1 ? 1 : 0}
                    onClick={() => {
                      this.props.addToCart(this.props.productDetail.id, -1);
                      this.handlechange();
                    }}
                  >
                    <FiMinus />
                  </button>

                  <input id="quantity" min="1" value={this.state.qty} type="number" className="form-control form-control-sm" onChange={this.handleinput} />

                  <button
                    className="btn btn-link px-2"
                    onClick={() => {
                      this.props.addToCart(this.props.productDetail.id, 1);
                      this.handlechange();
                    }}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-3 offset-lg-1 d-flex flex-column">
              {this.props.productDetail.beforeSale !== this.props.productDetail.harga ? (
                <>
                  <p className="fs-4 text-danger mb-0">{harga}</p>
                  <small className="text-muted text-decoration-line-through">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.productDetail.beforeSale * this.props.productDetail.qty)}
                  </small>
                </>
              ) : (
                <p className="mb-0 fs-4">{harga}</p>
              )}
            </div>
            <div className="text-end col-md-1">
              <button className="btn text-danger fs-5" onClick={this.deleteFromCart}>
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default CartPerProduct;
