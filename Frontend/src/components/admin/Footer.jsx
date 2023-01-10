import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-center small">
            <div className="text-muted">Copyright &copy; Team Apple 2022</div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
