import { Cart } from "./cart";

export const Layout = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
          <div className="container-fluid px-2 px-lg-3 mx-3">
            <a href="/">
              <img
                src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
                width="200px"
                alt="LaptopU Logo"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    All Products
                  </a>
                </li>
              </ul>
              <div className="d-flex">
                <a href="/" className="btn btn-outline-dark">
                  <i className="bi-cart-fill me-1"></i>
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">
                    0
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <footer className="py-4 bg-dark mt-auto fixed-bottom">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-center small">
              <div className="text-white">Copyright &copy; Team Apple 2022</div>
            </div>
          </div>
        </footer>
      </header>

      <Cart />
    </>
  );
};
