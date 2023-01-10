import React from "react";
import CartPerProduct from "../components/CartPerProduct";
import { FiAward } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.cartTotal,
    };
  }
  payment = () => {
    if (this.props.cartTotal <= 0) {
      Swal.fire({
        icon: "warning",
        text: "Your cart is still empty!",
        confirmButtonColor: "#3085d6"
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "Thanks For Shopping! ",
        confirmButtonColor: "#3085d6"
      });
      this.props.payment();
    }
  };

  discountNotApplied = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: "Wrong Discount Code!<br>Make sure you spell it correctly.",
      confirmButtonColor: "#3085d6",
    });
  };
  applyCode = (e) => {
    e.preventDefault();
    if (e.target[0].value.toLowerCase() === "apple100") {
      this.props.applyCode(true);
    } else {
      e.target[0].value = "";
      e.target[0].focus();
      this.discountNotApplied();
      this.props.applyCode(false);
    }
  };
  render() {
    let allcartitem = this.props.cartItems.map((cartitem) => {
      return <CartPerProduct productDetail={cartitem} key={"cart" + cartitem.id} addToCart={this.props.addToCart} deleteFromCart={this.props.deleteFromCart} />;
    });

    return (
      <>
        <article className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100 p-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>

            {this.props.cartItems.length === 0 ? (
              <div className="alert alert-warning">
                Oops, shopping cart is empty!
                <Link to="/catalog" className="text-success" style={{ fontWeight: 500 }}>
                  Add something to your cart !
                </Link>
              </div>
            ) : (
              <>
                {allcartitem}
                <section className="card mb-4 bg-teal">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      {this.props.appliedCode ? (
                        <>
                          <p className="fs-4 text-danger" id="total">
                            Total: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.cartTotal * 0.9)}
                            <small className="text-muted text-decoration-line-through fs-6"> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.cartTotal)}</small>
                          </p>
                          <p className="ms-4 text-success shadow-sm p-2">
                            <FiAward /> Discount applied
                          </p>
                        </>
                      ) : (
                        <p className="fs-4" id="total">
                          Total: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.cartTotal)}
                        </p>
                      )}
                    </div>
                    <form className="d-flex flex-row" onSubmit={this.applyCode}>
                      <input type="text" id="discount" name="discount" className="form-control form-control-lg" placeholder="Discount Code" />
                      <button type="submit" className="btn btn-outline-dark btn-lg ms-3">
                        Apply
                      </button>
                    </form>
                  </div>
                </section>
                <button type="button" className="btn btn-success btn-lg" onClick={this.payment}>
                  Proceed to Pay
                </button>
              </>
            )}
          </div>
        </article>
      </>
    );
  }
}
export default Cart;
