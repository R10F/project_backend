import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

class Layout extends React.Component {
  render() {
    return (
      <main>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
          <div className="container-fluid px-2 px-lg-3 mx-3">
            <Link to="/">
              <img src={require("../assets/img/laptopu2.png")} width="200px" alt="LaptopU Logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className="nav-link">
                    All Products
                  </NavLink>
                </li>
              </ul>
              <div className="d-flex">
                <Link to="/cart" className="btn btn-outline-dark">
                  <i className="bi-cart-fill me-1"></i>
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">{this.props.inCart}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />

        <footer className="py-4 bg-dark mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-center small">
              <div className="text-white">Copyright &copy; Team Apple 2022</div>
            </div>
          </div>
        </footer>
      </main>
    );
  }
}

export default Layout;
