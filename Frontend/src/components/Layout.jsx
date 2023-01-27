import { Cart } from "./Cart";

export const Layout = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-light bg-light fixed-top shadow-sm">
          <div className="container">
            <a href="/">
              <img
                src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
                width="200px"
                alt="Logo"
              />
            </a>
          </div>
        </nav>
      </header>

      <Cart />

      <footer className="py-3 bg-dark">
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
