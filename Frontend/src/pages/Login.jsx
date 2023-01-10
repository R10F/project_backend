import React from "react";
import Footer from "../components/admin/Footer";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { showAlert: false };
  }

  login = (e) => {
    e.preventDefault();

    const username = e.target.querySelector("#inputUsername").value;
    const password = e.target.querySelector("#inputPassword").value;

    if (username === "admin" && password === "admin") {
      localStorage.setItem("laptopuLogin", true);
      window.location.replace("/admin/dashboard");
    } else {
      this.setState({ showAlert: true });
    }
  };

  render() {
    return (
      <div className="bg-primary">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header">
                        <h3 className="text-center font-weight-light my-4">Login</h3>
                      </div>
                      <div className="card-body">
                        <div className={"alert alert-danger " + (this.state.showAlert ? "" : "d-none")} role="alert">
                          Incorrect username or password, you're not admin!
                        </div>

                        <form onSubmit={this.login}>
                          <div className="form-floating mb-3">
                            <input className="form-control" id="inputUsername" type="text" placeholder="Username" />
                            <label for="inputUsername">Username</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input className="form-control" id="inputPassword" type="password" placeholder="Password" />
                            <label for="inputPassword">Password</label>
                          </div>
                          <div className="d-grid mt-4 mb-0">
                            <button type="submit" className="btn btn-primary">
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center py-3">Only admin login is available!</div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div id="layoutAuthentication_footer">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (localStorage.getItem("laptopuLogin") === "true") {
      window.location.replace("/admin/dashboard");
    }
  }
}

export default Login;
