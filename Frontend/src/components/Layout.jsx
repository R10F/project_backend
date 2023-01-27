import { Cart } from "./cart";

export const Layout = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
          <div className="container">
            <a href="/">
              <img
                src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
                width="200px"
                alt="Logo"
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
          </div>
        </nav>
      </header>

      <Cart />

      <footer className="py-4 bg-dark mt-auto fixed-bottom">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-center small">
            <div className="text-white">
              Copyright &copy; Team Apple {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
