import React from "react";

class ProductItem extends React.Component {
  editProduct = (e) => {
    e.preventDefault();

    const input = e.target.getElementsByClassName("form-control");

    this.props.editProduct(this.props.product.id, {
      name: input[0].value,
      price: input[1].value,
      salePrice: input[2].value,
      isSales: e.target.querySelector(".form-check-input").checked,
    });
  };

  render() {
    let harga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(this.props.product.harga);

    return (
      <tr>
        <td>
          <img src={this.props.product.src} className="w-50" alt={this.props.product.nama} />
        </td>
        <td>{this.props.product.nama}</td>
        <td>{harga}</td>
        <td>{this.props.product.rating ? this.props.product.rating : "-"}</td>
        <td>
          <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={"#editProductModal-" + this.props.product.id}>
            Edit
          </button>

          <div className="modal fade" id={"editProductModal-" + this.props.product.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Product
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={this.editProduct}>
                  <div className="modal-body text-start">
                    <div className="mb-4">
                      <label htmlFor={"editProductModalInput-1" + this.props.product.id} className="form-label">
                        Name
                      </label>
                      <input type="text" className="form-control" id={"editProductModalInput-1" + this.props.product.id} defaultValue={this.props.product.nama} />
                    </div>

                    <label htmlFor={"editProductModalInput-2" + this.props.product.id} className="form-label">
                      Price
                    </label>
                    <div className="input-group mb-4">
                      <span className="input-group-text" id="basic-addon1">
                        Rp
                      </span>
                      <input type="text" className="form-control" id={"editProductModalInput-2" + this.props.product.id} defaultValue={this.props.product.harga} />
                    </div>

                    <div className="form-check form-switch mb-4">
                      <input className="form-check-input" type="checkbox" role="switch" id={"editProductModalInput-4" + this.props.product.id} defaultChecked={this.props.product.isSales} />
                      <label className="form-check-label" htmlFor={"editProductModalInput-4" + this.props.product.id}>
                        Sale
                      </label>
                    </div>

                    <label htmlFor={"editProductModalInput-5" + this.props.product.id} className="form-label">
                      Sale Price
                    </label>
                    <div className="input-group mb-4">
                      <span className="input-group-text" id="basic-addon1">
                        Rp
                      </span>
                      <input type="text" className="form-control" id={"editProductModalInput-5" + this.props.product.id} defaultValue={this.props.product.salePrice} />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
