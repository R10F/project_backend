import Aos from "aos";
import Swal from "sweetalert2";
import React, { Fragment } from "react";
import "aos/dist/aos.css";

class About extends React.Component {
  submit = () => {
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      if (form.checkValidity() === true) {
        Swal.fire({
          icon: "success",
          text: "Message Sent!",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "warning",
          text: "Complete Your Form",
        });
      }
    });
  };

  render() {
    Aos.init({
      once: true,
    });

    return (
      <Fragment>
        <section>
          <div className="container">
            <div className="row" style={{ marginBottom: "5rem" }}>
              <h1 className="text-center my-3 text-blue" data-aos="fade-down">
                ABOUT US
              </h1>

              <div className="col teks" data-aos="zoom-in-down" data-aos-duration="1000">
                <p className="text-justify">
                  <strong className="text-danger">Laptopu </strong> merupakan salah satu toko e-commerce terbesar dan terpercaya yang berfokus pada penjualan laptop gaming. Berdiri sejak tahun 2000, awalnya Laptopu menjual segala peralatan
                  komputer seperti monitor, mouse, dan keyboard. Namun, dalam kurun waktu 5 tahun terakhir, Laptopu menspesifikasikan diri menjadi distributor laptop gaming. Peralihan ini tentu tidak semudah membalikkan telapak tangan.
                  Banyaknya rintangan yang dihadapi oleh Laptopu tidak membuat semangat kami surut. Di tahun 2022 ini, Laptopu mampu mengukuhkan namanya sebagai salah satu e-commerce terbesar di Indonesia.
                  <br />
                  <br />
                  Ingin mengenal kami lebih jauh? Silakan menghubungi kami dengan mengisi form di bawah
                </p>
              </div>
            </div>

            <div className="row">
              <h1 className="text-center mt-3 mb-4 text-blue judul" data-aos="fade-down" data-aos-duration="2000">
                CONTACT US
              </h1>
            </div>
            <div className="row justify-content-center mb-5">
              <div className="col-md-6">
                <form className="needs-validation" data-aos="zoom-out-down" data-aos-duration="1500">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Input Your Name" required />
                    <label htmlFor="floatingInput">Name </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label htmlFor="floatingInput">Email </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Subject" required />
                    <label htmlFor="floatingInput">Subject </label>
                  </div>
                  <div className="form-floating mb-4">
                    <textarea className="form-control h-100" placeholder="Leave a Message here" id="floatingTextarea" rows="5" required></textarea>
                    <label htmlFor="floatingTextarea">Message</label>
                  </div>

                  <div className="d-grid gap-2 mt-2 mb-5">
                    <button className="btn btn-primary" type="button" onClick={this.submit}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default About;
